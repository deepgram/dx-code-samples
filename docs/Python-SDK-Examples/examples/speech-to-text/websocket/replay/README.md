### Speech to Text — Replay a saved stream (WebSocket)

**Learning objective**: Send a pre-recorded stream buffer over WebSocket and observe transcripts.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY` in your environment or `.env`
- **Install deps** (from the examples root):
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```

#### Run
```bash
cd sources/Python-SDK-Examples/examples/speech-to-text/websocket/replay
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, LiveOptions

with open("<raw-audio>", "rb") as f:
    data = f.read()

deepgram = DeepgramClient()
dg = deepgram.listen.websocket.v("1")

options = LiveOptions(model="nova-3", encoding="linear16", sample_rate=16000, channels=1)
if dg.start(options):
    dg.send(data)
    dg.finish()
```

#### Where to add more options
- Extend `LiveOptions(...)` with formatting and endpointing controls.