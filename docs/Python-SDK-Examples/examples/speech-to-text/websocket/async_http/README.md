### Speech to Text — Async HTTP feed to WebSocket

**Learning objective**: Fetch audio over HTTP asynchronously and forward it to Deepgram’s WebSocket.

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
cd sources/Python-SDK-Examples/examples/speech-to-text/websocket/async_http
python main.py
```

#### Key SDK calls
```python
import httpx
from deepgram import DeepgramClient, LiveOptions

deepgram = DeepgramClient()
dg = deepgram.listen.websocket.v("1")

options = LiveOptions(model="nova-3", language="en-US")
if dg.start(options):
    async with httpx.AsyncClient() as client:
        async with client.stream("GET", "<audio-url>") as r:
            async for chunk in r.aiter_bytes():
                dg.send(chunk)
    dg.finish()
```

#### Where to add more options
- Extend `LiveOptions(...)` to tune latency and formatting behavior.