"""Recipe: Context Injection — inject prior session context into a voice agent prompt."""

import threading, time
from typing import Union
from deepgram import DeepgramClient
from deepgram.agent.v1.types import (AgentV1InjectUserMessage, AgentV1Settings,
    AgentV1SettingsAgent, AgentV1SettingsAgentListen,
    AgentV1SettingsAgentListenProvider_V1, AgentV1SettingsAudio, AgentV1SettingsAudioInput)
from deepgram.core.events import EventType
from deepgram.types.speak_settings_v1 import SpeakSettingsV1
from deepgram.types.speak_settings_v1provider import SpeakSettingsV1Provider_Deepgram
from deepgram.types.think_settings_v1 import ThinkSettingsV1
from deepgram.types.think_settings_v1provider import ThinkSettingsV1Provider_OpenAi

PRIOR_CONTEXT = ["User prefers to be called Alex.",
                  "Last session discussed a trip to Tokyo in March.",
                  "User is allergic to shellfish."]

def main():
    client = DeepgramClient()
    ctx = "\n".join(f"- {c}" for c in PRIOR_CONTEXT)
    prompt = f"You remember the user from prior conversations.\nPrior context:\n{ctx}\nGreet the user by name."
    with client.agent.v1.connect() as agent:
        settings = AgentV1Settings(
            audio=AgentV1SettingsAudio(input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
            agent=AgentV1SettingsAgent(
                listen=AgentV1SettingsAgentListen(provider=AgentV1SettingsAgentListenProvider_V1(type="deepgram", model="nova-3")),
                think=ThinkSettingsV1(provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"), prompt=prompt),
                speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en"))))
        done = threading.Event()
        def on_message(msg: Union[str, bytes]) -> None:
            if isinstance(msg, bytes):
                print(f"Received {len(msg)} bytes of audio")
            elif getattr(msg, "type", "") == "ConversationText":
                print(f"[{getattr(msg, 'role', '?')}] {getattr(msg, 'content', '')}")
                if getattr(msg, "role", "") == "assistant": done.set()
            elif getattr(msg, "type", "") == "SettingsApplied":
                print("Settings applied with prior context injected")
        agent.on(EventType.OPEN, lambda _: print("Connection opened"))
        agent.on(EventType.MESSAGE, on_message)
        agent.on(EventType.CLOSE, lambda _: print("Connection closed"))
        threading.Thread(target=agent.start_listening, daemon=True).start()
        agent.send_settings(settings)
        print(f"Injected {len(PRIOR_CONTEXT)} prior context items into agent prompt")
        agent.send_inject_user_message(AgentV1InjectUserMessage(content="Hi! Remind me about my upcoming trip?"))
        done.wait(30)
        time.sleep(2)

if __name__ == "__main__":
    main()
