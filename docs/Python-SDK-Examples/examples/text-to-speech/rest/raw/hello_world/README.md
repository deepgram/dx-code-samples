### Text to Speech — Fetch audio stream (REST)

**Learning objective**: Request TTS audio as a byte stream and write it to a file.

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
cd sources/Python-SDK-Examples/examples/text-to-speech/rest/raw/hello_world
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, DeepgramClientOptions, SpeakOptions

SPEAK_TEXT = {"text": "Hello world!"}
options = SpeakOptions(model="aura-2-thalia-en")

deepgram = DeepgramClient("", DeepgramClientOptions())
response = deepgram.speak.rest.v("1").stream_raw(SPEAK_TEXT, options)

with open("test.mp3", "wb") as out:
    for data in response.iter_bytes():
        out.write(data)
response.close()
```

#### Where to add more options
- Extend `SpeakOptions(...)` for voice and audio parameters (e.g., `encoding`, `container`, `sample_rate`).