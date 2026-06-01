"""
Recipe: Proactive Speech During Silence (Voice Agents v1)
==========================================================
Injects agent messages during user silence so the agent fills
pauses with context-aware prompts.  Uses send_inject_agent_message
with behavior="queue" to avoid interrupting if the user speaks.
"""

import threading
import time

from deepgram import DeepgramClient
from deepgram.agent.v1.types import (
    AgentV1InjectAgentMessage, AgentV1Settings, AgentV1SettingsAgent,
    AgentV1SettingsAgentListen, AgentV1SettingsAgentListenProvider_V1,
    AgentV1SettingsAudio, AgentV1SettingsAudioInput,
)
from deepgram.core.events import EventType
from deepgram.types.speak_settings_v1 import SpeakSettingsV1
from deepgram.types.speak_settings_v1provider import SpeakSettingsV1Provider_Deepgram
from deepgram.types.think_settings_v1 import ThinkSettingsV1
from deepgram.types.think_settings_v1provider import ThinkSettingsV1Provider_OpenAi

PROMPTS = [
    "Take your time — I'm here whenever you're ready.",
    "Would you like me to repeat or clarify anything?",
    "I can also help with other questions if you'd like.",
]


def main():
    client = DeepgramClient()
    with client.agent.v1.connect() as agent:
        ready = threading.Event()

        def on_message(message) -> None:
            if isinstance(message, bytes):
                print(f"Received {len(message)} bytes of agent audio")
            else:
                msg_type = getattr(message, "type", type(message).__name__)
                print(f"Event: {msg_type}")
                if msg_type == "SettingsApplied":
                    ready.set()

        agent.on(EventType.OPEN, lambda _: print("Connection opened"))
        agent.on(EventType.MESSAGE, on_message)
        agent.on(EventType.CLOSE, lambda _: print("Connection closed"))
        listener = threading.Thread(target=agent.start_listening, daemon=True)
        listener.start()

        settings = AgentV1Settings(
            audio=AgentV1SettingsAudio(
                input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
            agent=AgentV1SettingsAgent(
                listen=AgentV1SettingsAgentListen(
                    provider=AgentV1SettingsAgentListenProvider_V1(type="deepgram", model="nova-3")),
                think=ThinkSettingsV1(
                    provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"),
                    prompt="You are a helpful assistant. Be concise."),
                speak=SpeakSettingsV1(
                    provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en"))))
        agent.send_settings(settings)
        ready.wait(timeout=10)
        print("Agent ready — injecting proactive prompts")

        for i, prompt in enumerate(PROMPTS):
            agent.send_inject_agent_message(
                AgentV1InjectAgentMessage(message=prompt, behavior="queue"))
            print(f"Injected prompt {i + 1}/{len(PROMPTS)}: {prompt}")

        time.sleep(3)


if __name__ == "__main__":
    main()
