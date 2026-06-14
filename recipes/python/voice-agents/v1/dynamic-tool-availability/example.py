"""
Recipe: Dynamic Tool Availability (Voice Agents v1)
=====================================================
Demonstrates changing which tools the LLM can call per conversation
phase. Phase 1 offers only verify_identity; after verification
succeeds, send_update_think() swaps in get_balance and transfer_funds
— all on the same live WebSocket session.
"""

import threading, time

from deepgram import DeepgramClient
from deepgram.agent.v1.types import (
    AgentV1FunctionCallRequest, AgentV1InjectUserMessage,
    AgentV1SendFunctionCallResponse, AgentV1Settings, AgentV1SettingsAgent,
    AgentV1SettingsAgentListen, AgentV1SettingsAgentListenProvider_V1,
    AgentV1SettingsAudio, AgentV1SettingsAudioInput, AgentV1UpdateThink,
)
from deepgram.core.events import EventType
from deepgram.types.speak_settings_v1 import SpeakSettingsV1
from deepgram.types.speak_settings_v1provider import SpeakSettingsV1Provider_Deepgram
from deepgram.types.think_settings_v1 import ThinkSettingsV1
from deepgram.types.think_settings_v1provider import ThinkSettingsV1Provider_OpenAi

def _fn(name, desc, props, req):
    return {"name": name, "description": desc, "parameters": {"type": "object", "properties": props, "required": req}}

VERIFY = _fn("verify_identity", "Verify customer", {"code": {"type": "string"}}, ["code"])
BALANCE = _fn("get_balance", "Check balance", {}, [])
TRANSFER = _fn("transfer_funds", "Transfer money", {"amount": {"type": "number"}, "to": {"type": "string"}}, ["amount", "to"])

RESULTS = {"verify_identity": '{"verified":true}', "get_balance": '{"balance":"$4,210.50"}', "transfer_funds": '{"confirmation":"TXN-98201"}'}
P1 = "You are a bank assistant. Verify the user with verify_identity before anything else."
P2 = "Identity verified. You may now use get_balance and transfer_funds."

def main():
    client = DeepgramClient()
    phase, ready, done = {"n": 1}, threading.Event(), threading.Event()

    with client.agent.v1.connect() as agent:
        def on_msg(msg):
            if isinstance(msg, AgentV1FunctionCallRequest):
                print(f"[Phase {phase['n']}] Tool called: {msg.name}")
                agent.send_function_call_response(AgentV1SendFunctionCallResponse(
                    type="FunctionCallResponse", id=msg.id, name=msg.name, content=RESULTS.get(msg.name, "{}")))
                if msg.name == "verify_identity" and phase["n"] == 1:
                    phase["n"] = 2
                    agent.send_update_think(AgentV1UpdateThink(think=ThinkSettingsV1(
                        provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"),
                        prompt=P2, functions=[BALANCE, TRANSFER])))
                    print("[Phase 2] Tools updated → get_balance, transfer_funds")
                elif phase["n"] == 2:
                    done.set()
            elif not isinstance(msg, bytes):
                mt = getattr(msg, "type", "")
                if mt == "SettingsApplied":
                    ready.set()
                elif mt == "ConversationText":
                    print(f"[{getattr(msg, 'role', '?')}] {getattr(msg, 'content', '')}")

        agent.on(EventType.OPEN, lambda _: print("Connection opened"))
        agent.on(EventType.MESSAGE, on_msg)
        agent.on(EventType.CLOSE, lambda _: print("Connection closed"))
        threading.Thread(target=agent.start_listening, daemon=True).start()

        agent.send_settings(AgentV1Settings(
            audio=AgentV1SettingsAudio(input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
            agent=AgentV1SettingsAgent(
                listen=AgentV1SettingsAgentListen(provider=AgentV1SettingsAgentListenProvider_V1(type="deepgram", model="nova-3")),
                think=ThinkSettingsV1(provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"), prompt=P1, functions=[VERIFY]),
                speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en")))))
        print("[Phase 1] Tools: verify_identity")
        if not ready.wait(10):
            raise TimeoutError("Settings not applied")

        agent.send_inject_user_message(AgentV1InjectUserMessage(content="Hi, my code is ABC123"))
        if not done.wait(30):
            agent.send_inject_user_message(AgentV1InjectUserMessage(content="What is my balance?"))
            done.wait(15)
        time.sleep(2)

if __name__ == "__main__":
    main()
