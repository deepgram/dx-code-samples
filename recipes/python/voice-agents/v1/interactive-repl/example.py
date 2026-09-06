"""Interactive Voice Agent REPL — multi-turn conversation with speaker-labelled transcript."""
import threading, time
from typing import Union
from deepgram import DeepgramClient
from deepgram.agent.v1.types import (AgentV1InjectUserMessage, AgentV1Settings,
    AgentV1SettingsAgent, AgentV1SettingsAgentListen, AgentV1SettingsAgentListenProvider_V1,
    AgentV1SettingsAudio, AgentV1SettingsAudioInput)
from deepgram.core.events import EventType
from deepgram.types.speak_settings_v1 import SpeakSettingsV1
from deepgram.types.speak_settings_v1provider import SpeakSettingsV1Provider_Deepgram
from deepgram.types.think_settings_v1 import ThinkSettingsV1
from deepgram.types.think_settings_v1provider import ThinkSettingsV1Provider_OpenAi

PROMPTS = ["What is a spacewalk?", "How long does one typically last?"]
def main():
    ready, reply, transcript = threading.Event(), threading.Event(), []
    def on_message(msg: Union[str, bytes]) -> None:
        if isinstance(msg, bytes):
            return
        msg_type = getattr(msg, "type", "")
        if msg_type == "SettingsApplied":
            ready.set()
        elif msg_type == "ConversationText":
            role, content = getattr(msg, "role", "?"), getattr(msg, "content", "")
            label = "You" if role == "user" else "Agent"
            print(f"[{label}] {content}")
            transcript.append(f"{label}: {content}")
            if role == "assistant":
                reply.set()

    client = DeepgramClient()
    with client.agent.v1.connect() as agent:
        agent.on(EventType.MESSAGE, on_message)
        threading.Thread(target=agent.start_listening, daemon=True).start()
        agent.send_settings(AgentV1Settings(
            audio=AgentV1SettingsAudio(input=AgentV1SettingsAudioInput(encoding="linear16", sample_rate=24000)),
            agent=AgentV1SettingsAgent(
                listen=AgentV1SettingsAgentListen(provider=AgentV1SettingsAgentListenProvider_V1(type="deepgram", model="nova-3")),
                think=ThinkSettingsV1(provider=ThinkSettingsV1Provider_OpenAi(type="open_ai", model="gpt-4o-mini"), prompt="You are a helpful assistant. Keep answers to one sentence."),
                speak=SpeakSettingsV1(provider=SpeakSettingsV1Provider_Deepgram(type="deepgram", model="aura-2-thalia-en")))))
        assert ready.wait(10), "Settings not applied"
        for prompt in PROMPTS:
            reply.clear()
            agent.send_inject_user_message(AgentV1InjectUserMessage(content=prompt))
            assert reply.wait(30), "Agent did not respond"
        time.sleep(1)
    print(f"\nSession complete — {len(transcript)} messages exchanged")

if __name__ == "__main__":
    main()
