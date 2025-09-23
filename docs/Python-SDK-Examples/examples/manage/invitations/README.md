### Manage — Invitations

**Learning objective**: List, send, and delete invitations for a project.

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
cd sources/Python-SDK-Examples/examples/manage/invitations
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, InviteOptions

dg = DeepgramClient()
project_id = dg.manage.v("1").get_projects().projects[0].project_id

invites = dg.manage.v("1").get_invites(project_id)
opts: InviteOptions = {"email": "someone@example.com", "scope": "member"}
resp = dg.manage.v("1").send_invite_options(project_id, opts)
delr = dg.manage.v("1").delete_invite(project_id, "someone@example.com")
```

#### Where to add more options
- Adjust `scope` values and use async variants under `asyncmanage` if preferred.