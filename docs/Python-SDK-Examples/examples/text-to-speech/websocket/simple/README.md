### Text to Speech — Stream synthesis over WebSocket

**Learning objective**: Stream synthesized audio over WebSocket and optionally play it.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY` in your environment or `.env`
- **Install deps** (from the examples root):
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```
- Optional: enable speaker playback by setting `speaker_playback` in client options (uses PyAudio).

#### Run
```bash
cd sources/Python-SDK-Examples/examples/text-to-speech/websocket/simple
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, SpeakWSOptions

deepgram = DeepgramClient()
dg = deepgram.speak.websocket.v("1")

dg.on(...)

options = SpeakWSOptions(
  model="aura-2-thalia-en",
  encoding="linear16",
  sample_rate=16000,
)

if dg.start(options):
  dg.send_text("Hello from Deepgram!")
  dg.flush()
  dg.wait_for_complete()
  dg.finish()
```

#### Where to add more options
- Extend `SpeakWSOptions(...)` (e.g., `voice`, `stability`, `format`).