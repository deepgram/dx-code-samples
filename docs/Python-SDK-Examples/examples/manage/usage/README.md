### Manage — Usage and summaries

**Learning objective**: List usage requests, fields, and summary for a project.

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
cd sources/Python-SDK-Examples/examples/manage/usage
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

dg = DeepgramClient()
project_id = dg.manage.v("1").get_projects().projects[0].project_id
requests = dg.manage.v("1").get_usage_requests(project_id, {})
fields = dg.manage.v("1").get_usage_fields(project_id, {})
summary = dg.manage.v("1").get_usage_summary(project_id, {})
```

#### Where to add more options
- Include filters in usage requests/summary options to narrow results.