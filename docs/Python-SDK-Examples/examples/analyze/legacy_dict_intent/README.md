### Analyze — Intents (legacy dict options)

**Learning objective**: Use plain dict options with the Analyze API to detect intents.

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
cd sources/Python-SDK-Examples/examples/analyze/legacy_dict_intent
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, TextSource

with open("conversation.txt", "r") as f:
    payload: TextSource = {"buffer": f.read()}

options = {"language": "en", "intents": True}

deepgram = DeepgramClient()
response = deepgram.read.analyze.v("1").analyze_text(payload, options)
print(response.to_json(indent=4))
```

#### Where to add more options
- Supply additional keys in the dict (e.g., `sentiment`, `topics`).