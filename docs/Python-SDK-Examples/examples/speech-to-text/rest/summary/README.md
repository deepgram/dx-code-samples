### Speech to Text — Summarize transcript (REST)

**Learning objective**: Request a transcript with an automatic summary using SDK options.

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
cd sources/Python-SDK-Examples/examples/speech-to-text/rest/summary
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, PrerecordedOptions, UrlSource

dg = DeepgramClient()
opts = PrerecordedOptions(model="nova-3", smart_format=True, summarize="v2")
resp = dg.listen.rest.v("1").transcribe_url(
  {"url": "https://dpgr.am/spacewalk.wav"}, opts
)
print(resp.to_json(indent=4))
```

#### Where to add more options
- Add `utterances=True`, `punctuate=True`, or change `summarize` strategy.