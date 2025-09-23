### Advanced — Direct WebSocket invocation

**Learning objective**: Use the low-level `ListenWebSocketClient` directly and stream HTTP audio.

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
cd sources/Python-SDK-Examples/examples/advanced/websocket/direct_invocation
python main.py
```

#### Key SDK calls
```python
from deepgram import ListenWebSocketClient, LiveOptions
import httpx

live = ListenWebSocketClient()
live.on(...)

opts = LiveOptions(model="nova-3", language="en-US")
if live.start(opts):
    with httpx.stream("GET", "<stream-url>") as r:
        for chunk in r.iter_bytes():
            live.send(chunk)
    live.finish()
```

#### Where to add more options
- Pass `options={"keepalive":"true"}` via `ClientOptionsFromEnv`, add `addons` to `start()`.