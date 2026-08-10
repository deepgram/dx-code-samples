"""Voice Agent Guardrails: iteration limits, topic enforcement, response validation."""
import threading, time
from deepgram import DeepgramClient
from deepgram.agent.v1.types import (AgentV1ConversationText, AgentV1FunctionCallRequest, AgentV1InjectUserMessage, AgentV1SendFunctionCallResponse, AgentV1Settings, AgentV1SettingsAgent, AgentV1SettingsAgentListen, AgentV1SettingsAgentListenProvider_V1, AgentV1SettingsAudio, AgentV1SettingsAudioInput)
from deepgram.core.events import EventType
from deepgram.types.speak_settings_v1 import SpeakSettingsV1
from deepgram.types.speak_settings_v1provider import SpeakSettingsV1Provider_Deepgram
from deepgram.types.think_settings_v1 import ThinkSettingsV1
from deepgram.types.think_settings_v1provider import ThinkSettingsV1Provider_OpenAi

MAX_ITERS, TOPICS, MAX_LEN = 3, ["weather", "time", "greetings"], 500
TOOL = {"name": "get_weather", "description": "Get weather for a city", "parameters": {"type": "object", "properties": {"location": {"type": "string"}}, "required": ["location"]}}
call_count = 0
def main():
    global call_count
    client = DeepgramClient()
    with client.agent.v1.connect() as agent:
        settings = AgentV1Settings(
            audio=AgentV1SettingsAudio(input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
            agent=AgentV1SettingsAgent(
                listen=AgentV1SettingsAgentListen(provider=AgentV1SettingsAgentListenProvider_V1(type="deepgram", model="nova-3")),
                think=ThinkSettingsV1(provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"), prompt=f"You ONLY discuss: {', '.join(TOPICS)}. Politely decline anything else. Use get_weather for weather.", functions=[TOOL]),
                speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en"))))
        applied, done = threading.Event(), threading.Event()
        def on_msg(msg):
            global call_count
            if isinstance(msg, AgentV1FunctionCallRequest):
                for fn in msg.functions:
                    call_count += 1
                    blocked = call_count > MAX_ITERS
                    print(f"{'GUARDRAIL BLOCKED' if blocked else f'Tool #{call_count}'}: {fn.name}")
                    agent.send_function_call_response(AgentV1SendFunctionCallResponse(type="FunctionCallResponse", id=fn.id, name=fn.name, content='{"error":"limit"}' if blocked else '{"temp":"72F","condition":"sunny"}'))
            elif isinstance(msg, AgentV1ConversationText):
                if msg.role == "assistant" and len(msg.content) > MAX_LEN:
                    print(f"GUARDRAIL: response too long ({len(msg.content)}/{MAX_LEN} chars)")
                print(f"[{msg.role}] {msg.content}")
                if msg.role == "assistant": done.set()
            elif not isinstance(msg, bytes) and getattr(msg, "type", "") == "SettingsApplied":
                applied.set(); print("Event: SettingsApplied")
        agent.on(EventType.OPEN, lambda _: print("Connection opened"))
        agent.on(EventType.MESSAGE, on_msg)
        threading.Thread(target=agent.start_listening, daemon=True).start()
        agent.send_settings(settings)
        applied.wait(10)
        print(f"Guardrails active — max_iters={MAX_ITERS}, topics={TOPICS}, max_len={MAX_LEN}")
        agent.send_inject_user_message(AgentV1InjectUserMessage(content="What is the weather in Paris?"))
        done.wait(30); time.sleep(2)

if __name__ == "__main__":
    main()
