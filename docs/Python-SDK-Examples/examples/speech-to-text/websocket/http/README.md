### Speech to Text — Live transcription from HTTP audio stream (WebSocket)

**Learning objective**: Stream audio pulled over HTTP to Deepgram via WebSocket using the Python SDK.

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
cd sources/Python-SDK-Examples/examples/speech-to-text/websocket/http
python main.py
```

#### Key SDK calls
```python
import httpx
from deepgram import DeepgramClient, LiveOptions

deepgram = DeepgramClient()
dg = deepgram.listen.websocket.v("1")

dg.on(...)

options = LiveOptions(model="nova-3", language="en-US")
if dg.start(options):
    with httpx.stream("GET", "http://stream.live.vc.bbcmedia.co.uk/bbc_world_service") as r:
        for chunk in r.iter_bytes():
            dg.send(chunk)
    dg.finish()
```

#### Where to add more options
- Extend `LiveOptions(...)` to change model, language, formatting, endpointing, etc.