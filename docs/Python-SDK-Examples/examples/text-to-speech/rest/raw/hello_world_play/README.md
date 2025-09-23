### Text to Speech — Stream raw PCM and play locally (REST)

**Learning objective**: Request raw PCM audio and play it using sounddevice.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY`
- **Install deps** (from the examples root):
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```

#### Run
```bash
cd sources/Python-SDK-Examples/examples/text-to-speech/rest/raw/hello_world_play
python main.py
```

#### Key SDK calls
```python
import sounddevice as sd
import numpy as np
from deepgram import DeepgramClient, SpeakOptions

SPEAK_TEXT = {"text": "Hello world!"}
options = SpeakOptions(model="aura-2-thalia-en", encoding="linear16", container="none", sample_rate=48000)

deepgram = DeepgramClient()
response = deepgram.speak.rest.v("1").stream_raw(SPEAK_TEXT, options)

# Iterate response.iter_bytes(), convert to np.int16 and play with sounddevice
```

#### Where to add more options
- Adjust `SpeakOptions(...)` for different voices, rates, formats.