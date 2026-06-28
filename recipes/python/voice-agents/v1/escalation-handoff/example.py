"""Escalation Handoff — Voice Agent detects when a caller needs a human
and outputs a structured context packet via function calling."""

import json

from deepgram import DeepgramClient
from deepgram.agent.v1.types import (
    AgentV1FunctionCallRequest, AgentV1InjectAgentMessage,
    AgentV1SendFunctionCallResponse, AgentV1Settings, AgentV1SettingsAgent,
    AgentV1SettingsAgentListen, AgentV1SettingsAgentListenProvider_V1,
    AgentV1SettingsAudio, AgentV1SettingsAudioInput,
)
from deepgram.core.events import EventType
from deepgram.types.speak_settings_v1 import SpeakSettingsV1
from deepgram.types.speak_settings_v1provider import SpeakSettingsV1Provider_Deepgram
from deepgram.types.think_settings_v1 import ThinkSettingsV1
from deepgram.types.think_settings_v1provider import ThinkSettingsV1Provider_OpenAi

ESCALATE_FN = {
    "name": "escalate_to_human",
    "description": "Call when the user asks for a human, is repeatedly frustrated, or the issue is unresolvable.",
    "parameters": {"type": "object", "properties": {
        "reason": {"type": "string", "description": "Why escalation is needed"},
        "summary": {"type": "string", "description": "Conversation summary"},
        "sentiment": {"type": "string", "enum": ["positive", "neutral", "negative"]},
    }, "required": ["reason", "summary", "sentiment"]},
}

def main():
    client = DeepgramClient()
    with client.agent.v1.connect() as agent:
        agent.send_settings(AgentV1Settings(
            audio=AgentV1SettingsAudio(input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
            agent=AgentV1SettingsAgent(
                listen=AgentV1SettingsAgentListen(provider=AgentV1SettingsAgentListenProvider_V1(type="deepgram", model="nova-3")),
                think=ThinkSettingsV1(
                    provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"),
                    prompt="You are a support agent. Help the caller. If you cannot resolve their issue, they ask for a human, or they seem frustrated, call escalate_to_human.",
                    functions=[ESCALATE_FN],
                ),
                speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en")),
            ),
        ))
        print("Agent configured with escalation handoff")

        def on_message(msg) -> None:
            if isinstance(msg, AgentV1FunctionCallRequest):
                args = json.loads(msg.input) if isinstance(msg.input, str) else msg.input
                packet = {"escalation": True, "call_id": msg.id, **args}
                print(f"ESCALATION CONTEXT PACKET:\n{json.dumps(packet, indent=2)}")
                agent.send_function_call_response(AgentV1SendFunctionCallResponse(
                    type="FunctionCallResponse", id=msg.id, name=msg.name, content='{"status":"transferring"}'))
                agent.send_inject_agent_message(AgentV1InjectAgentMessage(
                    message="I'm transferring you to a human agent now. They'll have full context. Please hold."))
            elif isinstance(msg, bytes):
                print(f"Audio: {len(msg)} bytes")
            else:
                print(f"Event: {getattr(msg, 'type', type(msg).__name__)}")

        agent.on(EventType.OPEN, lambda _: print("Connection opened"))
        agent.on(EventType.MESSAGE, on_message)
        agent.on(EventType.CLOSE, lambda _: print("Connection closed"))
        agent.start_listening()

if __name__ == "__main__":
    main()
