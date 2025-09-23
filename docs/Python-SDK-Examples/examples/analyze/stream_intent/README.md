### Analyze — Stream text for intents

**Learning objective**: Send a text stream to Analyze and detect intents.

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
cd sources/Python-SDK-Examples/examples/analyze/stream_intent
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, AnalyzeOptions, AnalyzeStreamSource

stream = open("conversation.txt", "rb")
payload: AnalyzeStreamSource = {"stream": stream}
options = AnalyzeOptions(language="en", intents=True)

deepgram = DeepgramClient()
resp = deepgram.read.analyze.v("1").analyze_text(payload, options)
print(resp.to_json(indent=4))
```

#### Where to add more options
- Add more flags to `AnalyzeOptions(...)` per need.