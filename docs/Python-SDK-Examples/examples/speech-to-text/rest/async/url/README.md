### Speech to Text — Transcribe from URL (REST, async)

**Learning objective**: Submit a URL for async transcription using the Python SDK.

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
cd sources/Python-SDK-Examples/examples/speech-to-text/rest/async/url
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, PrerecordedOptions, UrlSource

deepgram = DeepgramClient()

payload: UrlSource = {"url": "https://dpgr.am/spacewalk.wav"}
options = PrerecordedOptions(model="nova-3", smart_format=True)

response = deepgram.listen.rest.v("1").transcribe_url(payload, options)
print(response.to_json(indent=4))
```

#### Where to add more options
- Include `callback` details and other fields in `PrerecordedOptions(...)` for async flows.