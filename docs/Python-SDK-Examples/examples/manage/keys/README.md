### Manage — API keys

**Learning objective**: List, create, get, and delete API keys using the Python SDK.

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
cd sources/Python-SDK-Examples/examples/manage/keys
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, KeyOptions

dg = DeepgramClient()
project_id = dg.manage.v("1").get_projects().projects[0].project_id

# Create
opts: KeyOptions = {"comment": "MyTestKey", "scopes": ["member:write", "project:read"], "time_to_live_in_seconds": 3600}
created = dg.manage.v("1").create_key(project_id, opts)

# List / Get / Delete
keys = dg.manage.v("1").get_keys(project_id)
key_id = created.api_key_id
getk = dg.manage.v("1").get_key(project_id, key_id)
delr = dg.manage.v("1").delete_key(project_id, key_id)
```

#### Where to add more options
- Adjust scopes and TTL to match least-privilege and session needs.