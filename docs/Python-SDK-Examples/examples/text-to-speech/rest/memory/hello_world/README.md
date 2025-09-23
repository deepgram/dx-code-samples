### Text to Speech — Stream to in-memory buffer (REST)

**Learning objective**: Stream synthesized audio into memory, then save to disk.

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
cd sources/Python-SDK-Examples/examples/text-to-speech/rest/memory/hello_world
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, SpeakOptions

dg = DeepgramClient()
opts = SpeakOptions(model="aura-2-thalia-en")
response = dg.speak.rest.v("1").stream_memory({"text": "Hello world!"}, opts)
with open("test.mp3", "wb+") as f:
    f.write(response.stream_memory.getbuffer())
```

#### Where to add more options
- Adjust `SpeakOptions(...)` for encoding, container, and voice settings.