### Manage — List projects

**Learning objective**: Use the Python SDK to list projects for the authenticated account.

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
cd sources/Python-SDK-Examples/examples/manage/projects
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

deepgram = DeepgramClient()
projects = deepgram.manage.v("1").projects()
print(projects)
```

#### Where to add more options
- Explore other management endpoints: keys, members, invitations, usage, models, scopes.