### Agent — Start a basic Agent session

**Learning objective**: Connect to the Agent WebSocket, print events, and enable TTS/mic playback.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY` in your environment or `.env`
- **Install deps** (from the examples root):
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```
- Optional: to hear audio and capture mic, set `speaker_playback` and `microphone_record` in client options.

#### Run
```bash
cd sources/Python-SDK-Examples/examples/agent/simple
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, SettingsOptions, AgentWebSocketEvents

config = {
  "options": {
    "keepalive": "true",
    "microphone_record": "true",
    "speaker_playback": "true",
  }
}

deepgram = DeepgramClient("", config)
dg = deepgram.agent.websocket.v("1")

dg.on(AgentWebSocketEvents.Open, lambda *_: print("open"))
# ... bind other events ...

settings = SettingsOptions()
settings.agent.think.provider.type = "open_ai"
settings.agent.think.provider.model = "gpt-4o-mini"
settings.agent.speak.provider.model = "aura-2-thalia-en"
settings.agent.listen.provider.model = "nova-3"

if dg.start(settings):
  input("Press Enter to stop...\n")
  dg.finish()
```

#### Where to add more options
- Adjust `SettingsOptions()` for provider types, models, greeting, keyterms, and language.