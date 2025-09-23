### Speech to Text — Async microphone streaming (WebSocket)

**Learning objective**: Capture microphone audio asynchronously and stream to Deepgram for realtime transcripts.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY` in your environment or `.env`
- **Install deps** (from the examples root):
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```
- Microphone input requires `pyaudio`.

#### Run
```bash
cd sources/Python-SDK-Examples/examples/speech-to-text/websocket/async_microphone
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, LiveOptions, Microphone

deepgram = DeepgramClient()
dg = deepgram.listen.websocket.v("1")

options = LiveOptions(model="nova-3", language="en-US", interim_results=True)
if dg.start(options):
    mic = Microphone(dg.send)
    mic.start()
    input()
    mic.finish()
    dg.finish()
```

#### Where to add more options
- Add fields to `LiveOptions(...)` (e.g., `endpointing`, `vad_events`, `keywords`).