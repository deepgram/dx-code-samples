### Text to Speech — Save synthesis to file (REST)

**Learning objective**: Convert text to speech and save to a file using the Python SDK.

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
cd sources/Python-SDK-Examples/examples/text-to-speech/rest/file/hello_world
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, SpeakOptions

SPEAK_TEXT = {"text": "Hello world!"}
filename = "test.mp3"

deepgram = DeepgramClient()
options = SpeakOptions(model="aura-2-thalia-en")
response = deepgram.speak.rest.v("1").save(filename, SPEAK_TEXT, options)
print(response.to_json(indent=4))
```

#### Where to add more options
- Add fields to `SpeakOptions(...)` such as `voice`, `stability`, `pitch`, `encoding`, etc.