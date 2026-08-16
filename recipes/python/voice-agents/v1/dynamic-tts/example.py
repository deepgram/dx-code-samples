"""Dynamic TTS expressivity: switch voice, speed, and prompt mid-conversation."""

from deepgram import DeepgramClient
from deepgram.agent.v1.types import (
    AgentV1Settings, AgentV1SettingsAgent, AgentV1SettingsAgentListen,
    AgentV1SettingsAgentListenProvider_V1, AgentV1SettingsAudio,
    AgentV1SettingsAudioInput, AgentV1UpdatePrompt, AgentV1UpdateSpeak,
)
from deepgram.core.events import EventType
from deepgram.types import (
    SpeakSettingsV1, SpeakSettingsV1Provider_Deepgram,
    ThinkSettingsV1, ThinkSettingsV1Provider_OpenAi,
)

PROFILES = {
    "empathetic": ("aura-2-luna-en", 0.9, "You are a compassionate support agent. Speak gently and acknowledge feelings."),
    "neutral": ("aura-2-thalia-en", 1.0, "You are a helpful assistant. Provide clear, factual information."),
    "enthusiastic": ("aura-2-asteria-en", 1.1, "You are an upbeat, energetic assistant. Celebrate success with enthusiasm!"),
}

def apply_profile(agent, name):
    model, speed, prompt = PROFILES[name]
    agent.send_update_speak(AgentV1UpdateSpeak(speak=SpeakSettingsV1(
        provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model=model, speed=speed),
    )))
    agent.send_update_prompt(AgentV1UpdatePrompt(prompt=prompt))
    print(f"Switched to '{name}' — voice={model}, speed={speed}")

def main():
    client = DeepgramClient()
    with client.agent.v1.connect() as agent:
        settings = AgentV1Settings(
            audio=AgentV1SettingsAudio(input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
            agent=AgentV1SettingsAgent(
                listen=AgentV1SettingsAgentListen(provider=AgentV1SettingsAgentListenProvider_V1(type="deepgram", model="nova-3")),
                think=ThinkSettingsV1(provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"), prompt=PROFILES["neutral"][2]),
                speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en")),
            ),
        )
        agent.send_settings(settings)
        print("Agent configured with 3 expressivity profiles: empathetic, neutral, enthusiastic")
        for name in ["empathetic", "enthusiastic", "neutral"]:
            apply_profile(agent, name)
        agent.on(EventType.OPEN, lambda _: print("Connection opened"))
        agent.on(EventType.CLOSE, lambda _: print("Connection closed"))
        agent.start_listening()

if __name__ == "__main__":
    main()
