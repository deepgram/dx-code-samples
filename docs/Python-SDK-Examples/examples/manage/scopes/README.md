### Manage — Member scopes

**Learning objective**: Read and update a member’s scope within a project.

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
cd sources/Python-SDK-Examples/examples/manage/scopes
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

dg = DeepgramClient()
project_id = dg.manage.v("1").get_projects().projects[0].project_id
members = dg.manage.v("1").get_members(project_id)
member_id = members.members[0].member_id

current = dg.manage.v("1").get_member_scopes(project_id, member_id)
update = dg.manage.v("1").update_member_scope(project_id, member_id, {"scope": "admin"})
```

#### Where to add more options
- Change scope values; programmatically search for a member by email first.