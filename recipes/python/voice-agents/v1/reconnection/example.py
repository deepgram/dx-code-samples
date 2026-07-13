"""Voice agent reconnection with exponential backoff and jitter."""
import random, threading, time
from typing import Union
from deepgram import DeepgramClient
from deepgram.agent.v1.types import (
    AgentV1InjectUserMessage, AgentV1Settings, AgentV1SettingsAgent,
    AgentV1SettingsAgentListen, AgentV1SettingsAgentListenProvider_V1,
    AgentV1SettingsAudio, AgentV1SettingsAudioInput,
)
from deepgram.core.events import EventType
from deepgram.types.speak_settings_v1 import SpeakSettingsV1
from deepgram.types.speak_settings_v1provider import SpeakSettingsV1Provider_Deepgram
from deepgram.types.think_settings_v1 import ThinkSettingsV1; from deepgram.types.think_settings_v1provider import ThinkSettingsV1Provider_OpenAi

BASE_DELAY, MAX_DELAY, MAX_RETRIES = 0.5, 16.0, 5

def connect_with_backoff(client, settings):
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            with client.agent.v1.connect() as agent:
                done = threading.Event()
                agent.send_settings(settings)
                print(f"[attempt {attempt}] Connected — settings applied")
                def on_msg(m: Union[str, bytes]):
                    if isinstance(m, bytes):
                        print(f"Audio: {len(m)} bytes")
                    elif getattr(m, "role", "") == "assistant":
                        print(f"Agent: {getattr(m, 'content', '')}"); done.set()
                agent.on(EventType.MESSAGE, on_msg)
                threading.Thread(target=agent.start_listening, daemon=True).start()
                agent.send_inject_user_message(AgentV1InjectUserMessage(content="Say hello in one sentence."))
                done.wait(timeout=15); time.sleep(1); return
        except Exception as e:
            delay = min(BASE_DELAY * 2 ** (attempt - 1), MAX_DELAY) + random.uniform(0, 0.5)
            print(f"[attempt {attempt}] Failed: {e} — retrying in {delay:.1f}s")
            time.sleep(delay)
    print(f"All {MAX_RETRIES} attempts exhausted")

if __name__ == "__main__":
    client = DeepgramClient()
    settings = AgentV1Settings(
        audio=AgentV1SettingsAudio(input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
        agent=AgentV1SettingsAgent(
            listen=AgentV1SettingsAgentListen(provider=AgentV1SettingsAgentListenProvider_V1(type="deepgram", model="nova-3")),
            think=ThinkSettingsV1(provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"), prompt="Keep responses to one sentence."),
            speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en")),
        ))
    connect_with_backoff(client, settings)
