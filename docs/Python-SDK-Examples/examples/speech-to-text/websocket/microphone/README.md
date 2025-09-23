### Speech to Text — Live transcription from microphone (WebSocket)

**Learning objective**: Stream microphone audio to Deepgram and receive realtime transcripts with the Python SDK.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY` in your environment or `.env`
- **Install deps** (from the examples root):
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```
- Microphone input requires `pyaudio` (installed by the requirements file). On macOS you may need to approve mic access.

#### Run
```bash
cd sources/Python-SDK-Examples/examples/speech-to-text/websocket/microphone
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, LiveOptions, Microphone

deepgram = DeepgramClient()
dg = deepgram.listen.websocket.v("1")

def on_message(self, result, **kwargs):
    if result.is_final:
        print(result.to_json())

dg.on(...)

options = LiveOptions(
    model="nova-3",
    language="en-US",
    interim_results=True,
    utterance_end_ms="1000",
    vad_events=True,
)

if dg.start(options):
    mic = Microphone(dg.send)
    mic.start()
    input()
    mic.finish()
    dg.finish()
```

#### Where to add more options
- Add fields to `LiveOptions(...)` (e.g., `endpointing`, `diarize`, `keywords`, `smart_format`).