### Advanced — Inherit and extend the WebSocket client

**Learning objective**: Extend `ListenWebSocketClient` to customize event handling.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY`
- **Install deps**:
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```
- Mic access requires `pyaudio`.

#### Run
```bash
cd sources/Python-SDK-Examples/examples/advanced/websocket/microphone_inheritance
python main.py
```

#### Key SDK calls
```python
from deepgram import ListenWebSocketClient, LiveOptions, Microphone

class MyLiveClient(ListenWebSocketClient):
    def __init__(self, config):
        super().__init__(config)
        super().on(...)
    def on_message(self, parent, result, **kwargs):
        print(result.channel.alternatives[0].transcript)

live = MyLiveClient(...)
opts = LiveOptions(model="nova-3", encoding="linear16", sample_rate=16000)
if live.start(opts):
    mic = Microphone(live.send)
    mic.start(); input(); mic.finish(); live.finish()
```

#### Where to add more options
- Pass extras to `start(..., addons=..., members=...)` and handle custom kwargs in handlers.