### Auth — Exchange API key for bearer token and call APIs

**Learning objective**: Exchange an API key for an access token and use it to call other endpoints.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DG_API_KEY` or `DEEPGRAM_API_KEY`
- **Install deps** (from the examples root):
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```

#### Run
```bash
cd sources/Python-SDK-Examples/examples/auth/bearer_token_demo
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, PrerecordedOptions

api_client = DeepgramClient()
access = api_client.auth.v("1").grant_token(ttl_seconds=600)

bearer_client = DeepgramClient(access_token=access.access_token)
opts = PrerecordedOptions(model="nova-3", smart_format=True)
resp = bearer_client.listen.rest.v("1").transcribe_url(
  {"url": "https://dpgr.am/spacewalk.wav"}, opts
)
print(resp.to_json(indent=4))
```

#### Where to add more options
- Use additional `PrerecordedOptions(...)` fields; set token TTL appropriate to your client.