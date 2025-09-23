### Text to Speech — Stream to in-memory buffer (REST async)

**Learning objective**: Use the async REST client to stream synthesized audio to memory and save.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY`
- **Install deps**:
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```

#### Run
```bash
cd sources/Python-SDK-Examples/examples/text-to-speech/rest/memory/async_hello_world
python main.py
```

#### Key SDK calls
```python
import asyncio
from deepgram import DeepgramClient, SpeakOptions

async def main():
    dg = DeepgramClient()
    opts = SpeakOptions(model="aura-2-thalia-en")
    resp = await dg.speak.asyncrest.v("1").stream_memory({"text": "Hello world!"}, opts)
    with open("test.mp3", "wb") as f:
        f.write(resp.stream_memory.getbuffer())

asyncio.run(main())
```

#### Where to add more options
- Extend `SpeakOptions(...)` to set encoding, container, and voice parameters.