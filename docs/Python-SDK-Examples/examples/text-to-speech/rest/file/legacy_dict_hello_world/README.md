### Text to Speech — Save to file (legacy dict options)

**Learning objective**: Use dict-style options to synthesize speech and save to a file.

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
cd sources/Python-SDK-Examples/examples/text-to-speech/rest/file/legacy_dict_hello_world
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

opts = {"model": "aura-2-thalia-en"}
dg = DeepgramClient()
resp = dg.speak.rest.v("1").save("test.mp3", {"text": "Hello world!"}, opts)
print(resp.to_json(indent=4))
```

#### Where to add more options
- Add more dict keys such as `encoding`, `container`, or voice parameters.