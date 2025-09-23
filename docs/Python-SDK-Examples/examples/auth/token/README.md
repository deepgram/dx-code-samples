### Auth — Grant short-lived token

**Learning objective**: Use the Python SDK to request short-lived tokens for client-side usage.

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
cd sources/Python-SDK-Examples/examples/auth/token
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

deepgram = DeepgramClient()
print(deepgram.auth.v("1").grant_token())            # default TTL (30s)
print(deepgram.auth.v("1").grant_token(ttl_seconds=300))  # custom TTL
```

#### Where to add more options
- Supply `ttl_seconds` per your client’s needs. You can also scope keys and tokens using Deepgram’s dashboard and management APIs.