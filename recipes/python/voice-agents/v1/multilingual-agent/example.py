"""
Recipe: Multilingual Voice Agent — Nova-3 with language=multi for automatic
language detection, plus per-language TTS voice and prompt switching.
"""
import json

from deepgram import DeepgramClient
from deepgram.agent.v1.types import (
    AgentV1FunctionCallRequest, AgentV1SendFunctionCallResponse,
    AgentV1Settings, AgentV1SettingsAgent, AgentV1SettingsAgentListen,
    AgentV1SettingsAgentListenProvider_V1, AgentV1SettingsAudio,
    AgentV1SettingsAudioInput, AgentV1UpdatePrompt, AgentV1UpdateSpeak,
)
from deepgram.core.events import EventType
from deepgram.types.speak_settings_v1 import SpeakSettingsV1
from deepgram.types.speak_settings_v1provider import SpeakSettingsV1Provider_Deepgram
from deepgram.types.think_settings_v1 import ThinkSettingsV1
from deepgram.types.think_settings_v1provider import ThinkSettingsV1Provider_OpenAi

LANGS = {
    "en": {"voice": "aura-2-thalia-en", "prompt": "Reply in English."},
    "es": {"voice": "aura-2-thalia-es", "prompt": "Responde en español."},
    "fr": {"voice": "aura-2-thalia-fr", "prompt": "Répondez en français."},
}
SWITCH_FN = {"name": "switch_language", "description": "Call when the user's language changes",
             "parameters": {"type": "object", "properties": {"lang": {"type": "string", "enum": list(LANGS)}}, "required": ["lang"]}}
BASE_PROMPT = "You are a multilingual assistant. Detect the user's language and call switch_language when it changes. "

def main():
    client = DeepgramClient()
    with client.agent.v1.connect() as agent:
        settings = AgentV1Settings(
            audio=AgentV1SettingsAudio(input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
            agent=AgentV1SettingsAgent(
                listen=AgentV1SettingsAgentListen(provider=AgentV1SettingsAgentListenProvider_V1(type="deepgram", model="nova-3", language="multi")),
                think=ThinkSettingsV1(provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"), prompt=BASE_PROMPT + LANGS["en"]["prompt"], functions=[SWITCH_FN]),
                speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en")),
            ))
        agent.send_settings(settings)
        print("Multilingual agent configured (en/es/fr)")

        def on_message(msg) -> None:
            if isinstance(msg, AgentV1FunctionCallRequest) and msg.name == "switch_language":
                lang = json.loads(msg.input).get("lang", "en")
                cfg = LANGS.get(lang, LANGS["en"])
                agent.send_update_speak(AgentV1UpdateSpeak(speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model=cfg["voice"]))))
                agent.send_update_prompt(AgentV1UpdatePrompt(prompt=BASE_PROMPT + cfg["prompt"]))
                agent.send_function_call_response(AgentV1SendFunctionCallResponse(type="FunctionCallResponse", id=msg.id, name=msg.name, content=f'{{"switched_to": "{lang}"}}'))
                print(f"Switched to {lang}: voice={cfg['voice']}")
            elif isinstance(msg, bytes):
                print(f"Received {len(msg)} bytes of agent audio")
            else:
                print(f"Event: {getattr(msg, 'type', type(msg).__name__)}")

        agent.on(EventType.OPEN, lambda _: print("Connection opened"))
        agent.on(EventType.MESSAGE, on_message)
        agent.on(EventType.CLOSE, lambda _: print("Connection closed"))
        agent.start_listening()

if __name__ == "__main__":
    main()
