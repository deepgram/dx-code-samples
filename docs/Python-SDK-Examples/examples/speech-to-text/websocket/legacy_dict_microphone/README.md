### Speech to Text — Legacy dict options with microphone (WebSocket)

**Learning objective**: Use legacy dict-style options while streaming microphone audio.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY`
- **Install deps**:
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```
- Mic access requires `pyaudio` on macOS/Linux.

#### Run
```bash
cd sources/Python-SDK-Examples/examples/speech-to-text/websocket/legacy_dict_microphone
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, LiveOptions, Microphone

dg = DeepgramClient()
ws = dg.listen.websocket.v("1")
ws.on(...)

options = {
  "model": "nova-3",
  "encoding": "linear16",
  "sample_rate": 16000,
  "channels": 1,
}

if ws.start(options):
  mic = Microphone(ws.send)
  mic.start(); input(); mic.finish(); ws.finish()
```

#### Where to add more options
- Add dict keys like `language`, `interim_results`, and `endpointing`.