### Manage — Invitations (async)

**Learning objective**: Manage invitations with the async management client.

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
cd sources/Python-SDK-Examples/examples/manage/async_invitations
python main.py
```

#### Key SDK calls
```python
import asyncio
from deepgram import DeepgramClient

async def main():
    dg = DeepgramClient()
    projects = await dg.asyncmanage.v("1").get_projects()
    project_id = projects.projects[0].project_id
    await dg.asyncmanage.v("1").send_invite_options(project_id, {"email":"someone@example.com", "scope":"member"})

asyncio.run(main())
```

#### Where to add more options
- Use other `asyncmanage` endpoints for members, keys, models, and usage.