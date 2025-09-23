### Advanced — Mute/unmute microphone during streaming

**Learning objective**: Toggle microphone capture while streaming to the Listen WebSocket.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY`
- **Install deps**:
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```
- Mic access requires `pyaudio` (present in requirements file).

#### Run
```bash
cd sources/Python-SDK-Examples/examples/advanced/websocket/mute-microphone
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, LiveOptions, Microphone

dg = DeepgramClient()
ws = dg.listen.live.v("1")
opts = LiveOptions(model="nova-3", encoding="linear16", sample_rate=16000, channels=1, interim_results=True)
if ws.start(opts):
    mic = Microphone(ws.send)
    mic.start()
    mic.mute(); mic.unmute()
    mic.finish(); ws.finish()
```

#### Where to add more options
- Use `utterance_end_ms`, `endpointing`, and `vad_events` to tune endpointing.