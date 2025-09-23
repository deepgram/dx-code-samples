### Text to Speech — Save synthesis to file (REST async)

**Learning objective**: Use the async REST client to synthesize speech to a file.

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
cd sources/Python-SDK-Examples/examples/text-to-speech/rest/file/async_hello_world
python main.py
```

#### Key SDK calls
```python
import asyncio
from deepgram import DeepgramClient, SpeakOptions

SPEAK_TEXT = {"text": "Hello world!"}

deepgram = DeepgramClient()
options = SpeakOptions(model="aura-2-thalia-en")
response = await deepgram.speak.asyncrest.v("1").save("test.mp3", SPEAK_TEXT, options)
print(response.to_json(indent=4))
```

#### Where to add more options
- Add fields to `SpeakOptions(...)` (voice, style, encoding).