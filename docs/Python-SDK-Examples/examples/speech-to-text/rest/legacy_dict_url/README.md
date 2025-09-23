### Speech to Text — Legacy dict options (REST URL)

**Learning objective**: Use plain dict options when calling `transcribe_url`.

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
cd sources/Python-SDK-Examples/examples/speech-to-text/rest/legacy_dict_url
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

dg = DeepgramClient()
options = {"model": "nova-3", "smart_format": True}
resp = dg.listen.rest.v("1").transcribe_url(
  {"url": "https://dpgr.am/spacewalk.wav"}, options
)
print(resp)
```

#### Where to add more options
- Include additional keys in the dict as needed (e.g., `language`, `diarize`).