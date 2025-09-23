### Speech to Text — Intent detection on transcripts (REST)

**Learning objective**: Transcribe audio and detect intents within the same request.

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
cd sources/Python-SDK-Examples/examples/speech-to-text/rest/intent
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, PrerecordedOptions, FileSource

dg = DeepgramClient()
with open("CallCenterPhoneCall.mp3", "rb") as f:
  payload: FileSource = {"buffer": f.read()}
opts = PrerecordedOptions(model="nova-3", smart_format=True, intents=True)
resp = dg.listen.rest.v("1").transcribe_file(payload, opts)
print(resp.to_json(indent=4))
```

#### Where to add more options
- Add `utterances`, `keywords`, or a different `language` code.