### Speech to Text — Transcribe a local file (REST, async)

**Learning objective**: Submit a local audio file and retrieve an async transcription with the Python SDK.

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
cd sources/Python-SDK-Examples/examples/speech-to-text/rest/async/file
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, PrerecordedOptions, FileSource

deepgram = DeepgramClient()

with open("preamble.wav", "rb") as f:
    payload: FileSource = {"buffer": f.read()}

options = PrerecordedOptions(model="nova-3", smart_format=True)

# Submit job (async)
response = deepgram.listen.rest.v("1").transcribe_file(payload, options)
print(response.to_json(indent=4))
```

#### Where to add more options
- Add fields to `PrerecordedOptions(...)` (e.g., `callback`, `keywords`, `utterances`).