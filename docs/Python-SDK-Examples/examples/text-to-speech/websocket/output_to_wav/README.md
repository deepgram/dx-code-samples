### Text to Speech — Stream to WAV file (WebSocket)

**Learning objective**: Stream synthesized audio and write PCM to a WAV container.

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
cd sources/Python-SDK-Examples/examples/text-to-speech/websocket/output_to_wav
python main.py
```

#### Key SDK calls
```python
import wave
from deepgram import DeepgramClient, SpeakWSOptions

AUDIO_FILE = "output.wav"
header = wave.open(AUDIO_FILE, "wb")
header.setnchannels(1)
header.setsampwidth(2)
header.setframerate(16000)
header.close()

deepgram = DeepgramClient()
dg = deepgram.speak.websocket.v("1")

def on_binary_data(self, data, **kwargs):
    with open(AUDIO_FILE, "ab") as f:
        f.write(data)

dg.on(...)

options = SpeakWSOptions(model="aura-2-thalia-en", encoding="linear16", sample_rate=16000)
if dg.start(options):
    dg.send_text("Hello world")
    dg.flush()
    dg.finish()
```

#### Where to add more options
- Adjust `SpeakWSOptions(...)` for voice, encoding, and rate as needed.