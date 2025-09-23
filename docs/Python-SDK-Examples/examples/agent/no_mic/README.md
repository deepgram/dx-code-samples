### Agent — Stream URL to agent (no mic)

**Learning objective**: Start an Agent session, stream audio from a URL, and save agent audio to WAV without using a microphone.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY`
- **Install deps**:
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```

#### Run
```bash
cd sources/Python-SDK-Examples/examples/agent/no_mic
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, AgentWebSocketEvents
from deepgram.clients.agent.v1.websocket.options import SettingsOptions

dg = DeepgramClient()
conn = dg.agent.websocket.v("1")

opts = SettingsOptions()
opts.agent.listen.provider.model = "nova-3"
opts.agent.think.provider.model = "gpt-4o-mini"
opts.agent.speak.provider.model = "aura-2-thalia-en"

conn.on(AgentWebSocketEvents.AudioData, lambda self, data, **kw: ...)
conn.on(AgentWebSocketEvents.AgentAudioDone, lambda *_: ...)

if conn.start(opts):
  # stream bytes from a WAV URL (skip 44-byte header)
  ...
  conn.finish()
```

#### Where to add more options
- Tweak `options.audio.*` and `options.agent.*` providers, models, language, and greeting.