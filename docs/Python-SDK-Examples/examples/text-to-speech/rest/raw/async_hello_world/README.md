### Text to Speech — Fetch audio stream asynchronously (REST)

**Learning objective**: Request TTS and write streamed bytes to a file using async I/O.

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
cd sources/Python-SDK-Examples/examples/text-to-speech/rest/raw/async_hello_world
python main.py
```

#### Key SDK calls
```python
import aiofiles
from deepgram import DeepgramClient, DeepgramClientOptions, SpeakOptions

SPEAK_TEXT = {"text": "Hello world!"}

deepgram = DeepgramClient("", DeepgramClientOptions())
options = SpeakOptions(model="aura-2-thalia-en")

response = await deepgram.speak.asyncrest.v("1").stream_raw(SPEAK_TEXT, options)
async with aiofiles.open("test.mp3", "wb") as out:
    async for data in response.aiter_bytes():
        await out.write(data)
        await out.flush()
await response.aclose()
```

#### Where to add more options
- Add `encoding`, `container`, `sample_rate`, or voice-related fields in `SpeakOptions(...)`.
