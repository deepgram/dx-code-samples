### Analyze — Detect intents from text

**Learning objective**: Use the Python SDK to analyze plain text and return intents.

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
cd sources/Python-SDK-Examples/examples/analyze/intent
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, AnalyzeOptions, TextSource

TEXT_FILE = "conversation.txt"
with open(TEXT_FILE, "r") as f:
    payload: TextSource = {"buffer": f.read()}

options = AnalyzeOptions(language="en", intents=True)

deepgram = DeepgramClient()
response = deepgram.read.analyze.v("1").analyze_text(payload, options)
print(response.to_json(indent=4))
```

#### Where to add more options
- Add flags on `AnalyzeOptions(...)` such as `sentiment`, `topics`, `summary`.