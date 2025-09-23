### Analyze — Summarize text

**Learning objective**: Summarize text using Deepgram’s Analyze API via the Python SDK.

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
cd sources/Python-SDK-Examples/examples/analyze/summary
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, AnalyzeOptions, TextSource

with open("conversation.txt", "r") as f:
    payload: TextSource = {"buffer": f.read()}

options = AnalyzeOptions(language="en", summarize=True)

deepgram = DeepgramClient()
response = deepgram.read.analyze.v("1").analyze_text(payload, options)
print(response.to_json(indent=4))
```

#### Where to add more options
- Add `sentiment`, `intents`, and `topics` flags to `AnalyzeOptions(...)` if required.