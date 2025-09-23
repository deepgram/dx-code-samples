### Text to Speech — Save tongue twister to file (REST)

**Learning objective**: Synthesize longer text and save to a file.

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
cd sources/Python-SDK-Examples/examples/text-to-speech/rest/file/woodchuck
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, SpeakOptions

deepgram = DeepgramClient()
text = {"text": "How much wood would a woodchuck chuck..."}
options = SpeakOptions(model="aura-2-thalia-en")

resp = deepgram.speak.rest.v("1").save("woodchuck.mp3", text, options)
print(resp.to_json(indent=4))
```

#### Where to add more options
- Add options for voice, stability, pitch, and output encoding.