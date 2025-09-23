### Speech to Text — Submit transcription with callback URL (REST)

**Learning objective**: Send audio for transcription and receive results via your callback endpoint.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY` in your environment or `.env`
- **Install deps** (from the examples root):
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```
- A reachable HTTPS callback endpoint you control.

#### Run
```bash
cd sources/Python-SDK-Examples/examples/speech-to-text/rest/callback/callback
# Edit main.py to set CALL_BACK_URL to your endpoint
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, PrerecordedOptions, FileSource

deepgram = DeepgramClient()
with open("preamble.wav", "rb") as f:
    payload: FileSource = {"buffer": f.read()}

options = PrerecordedOptions(model="nova-3", smart_format=True, utterances=True)

response = deepgram.listen.rest.v("1").transcribe_file_callback(
  payload,
  "https://your.callback/endpoint",
  options=options,
)
print(response.to_json(indent=4))
```

#### Where to add more options
- You can also call `transcribe_url_callback(...)` for hosted audio and extend `PrerecordedOptions(...)`.