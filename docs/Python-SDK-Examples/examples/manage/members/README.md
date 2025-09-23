### Manage — Members

**Learning objective**: List and remove members from a project using the Python SDK.

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
cd sources/Python-SDK-Examples/examples/manage/members
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

dg = DeepgramClient()
project_id = dg.manage.v("1").get_projects().projects[0].project_id
members = dg.manage.v("1").get_members(project_id)

# Remove a member by id
# dg.manage.v("1").remove_member(project_id, member_id)
```

#### Where to add more options
- Use member email to locate IDs, then call remove/update scope APIs as appropriate.