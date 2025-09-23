### Manage — Models

**Learning objective**: List available models globally and for your project; get model details.

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
cd sources/Python-SDK-Examples/examples/manage/models
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

dg = DeepgramClient()
projects = dg.manage.v("1").get_projects()
models = dg.manage.v("1").get_models()

project_id = projects.projects[0].project_id
project_models = dg.manage.v("1").get_project_models(project_id)

# get a specific model by uuid
a_model = models.stt[0] if models.stt else models.tts[0]
model_detail = dg.manage.v("1").get_model(a_model.uuid)
```

#### Where to add more options
- Use async variants under `asyncmanage` for non-blocking flows.