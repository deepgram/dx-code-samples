"""Flux V2 in-band reconfiguration: update keyterms, language, and TTS mid-session."""
import threading, time
from deepgram import DeepgramClient
from deepgram.agent.v1.types import (
    AgentV1InjectUserMessage, AgentV1Settings, AgentV1SettingsAgent,
    AgentV1SettingsAgentListen, AgentV1SettingsAgentListenProvider_V2,
    AgentV1SettingsAudio, AgentV1SettingsAudioInput, AgentV1UpdateListen,
    AgentV1UpdateListenListen, AgentV1UpdateListenListenProvider_V2, AgentV1UpdateSpeak)
from deepgram.core.events import EventType
from deepgram.types.speak_settings_v1 import SpeakSettingsV1
from deepgram.types.speak_settings_v1provider import SpeakSettingsV1Provider_Deepgram
from deepgram.types.think_settings_v1 import ThinkSettingsV1
from deepgram.types.think_settings_v1provider import ThinkSettingsV1Provider_OpenAi

client = DeepgramClient()
with client.agent.v1.connect() as agent:
    ready, done = threading.Event(), threading.Event()
    def on_message(msg):
        if isinstance(msg, bytes):
            return
        t = getattr(msg, "type", "")
        if t == "SettingsApplied":
            ready.set()
        elif t == "ConversationText" and getattr(msg, "role", "") == "assistant":
            print(f"[assistant] {getattr(msg, 'content', '')}")
            done.set()
        elif t in ("ListenUpdated", "SpeakUpdated"):
            print(f"In-band update confirmed: {t}")
    agent.on(EventType.MESSAGE, on_message)
    threading.Thread(target=agent.start_listening, daemon=True).start()
    agent.send_settings(AgentV1Settings(
        audio=AgentV1SettingsAudio(input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
        agent=AgentV1SettingsAgent(
            listen=AgentV1SettingsAgentListen(provider=AgentV1SettingsAgentListenProvider_V2(
                model="flux-general-multi", keyterms=["Deepgram", "Nova"])),
            think=ThinkSettingsV1(provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"),
                prompt="You are a helpful customer service agent. Reply in the user's language."),
            speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en")))))
    ready.wait(10)
    print("Session ready — Flux v2 listen with keyterms [Deepgram, Nova]")
    agent.send_update_listen(AgentV1UpdateListen(listen=AgentV1UpdateListenListen(
        provider=AgentV1UpdateListenListenProvider_V2(
            model="flux-general-multi", keyterms=["Kubernetes", "gRPC"], language_hints=["es"]))))
    print("Updated listen: keyterms->[Kubernetes, gRPC], language->es")
    agent.send_update_speak(AgentV1UpdateSpeak(speak=SpeakSettingsV1(
        provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en", speed=0.9))))
    print("Updated speak: speed->0.9")
    agent.send_inject_user_message(AgentV1InjectUserMessage(content="What is Kubernetes?"))
    done.wait(30)
    time.sleep(1)
