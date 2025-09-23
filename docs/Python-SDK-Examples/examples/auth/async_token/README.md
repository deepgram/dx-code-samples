### Auth — Grant short-lived token (async)

**Learning objective**: Request short-lived tokens using the async auth client.

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
cd sources/Python-SDK-Examples/examples/auth/async_token
python main.py
```

#### Key SDK calls
```python
import asyncio
from deepgram import DeepgramClient

async def main():
    dg = DeepgramClient()
    print(await dg.asyncauth.v("1").grant_token())
    print(await dg.asyncauth.v("1").grant_token(ttl_seconds=300))

asyncio.run(main())
```

#### Where to add more options
- Customize `ttl_seconds`; use scopes on your API keys for least privilege.