### Manage — Invitations (legacy dict options)

**Learning objective**: Use plain dict options to invite and manage invitations.

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
cd sources/Python-SDK-Examples/examples/manage/legacy_dict_invitations
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

dg = DeepgramClient()
project_id = dg.manage.v("1").get_projects().projects[0].project_id

opts = {"email": "someone@example.com", "scope": "member"}
resp = dg.manage.v("1").send_invite_options(project_id, opts)
```

#### Where to add more options
- Supply more keys in the dict (e.g., different scope).