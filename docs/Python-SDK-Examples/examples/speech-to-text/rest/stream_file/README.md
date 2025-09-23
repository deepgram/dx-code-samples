### Speech to Text — Stream a file to REST

**Learning objective**: Stream file audio to the REST endpoint using the Python SDK.

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
cd sources/Python-SDK-Examples/examples/speech-to-text/rest/stream_file
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, PrerecordedOptions, FileSource

deepgram = DeepgramClient()

with open("preamble.wav", "rb") as f:
    payload: FileSource = {"buffer": f.read()}

options = PrerecordedOptions(model="nova-3", smart_format=True)
result = deepgram.listen.rest.v("1").transcribe_file(payload, options)
print(result.to_json(indent=4))
```

#### Where to add more options
- Use `PrerecordedOptions(...)` to tune transcription behavior (e.g., `punctuate`, `diarize`, `utterances`).