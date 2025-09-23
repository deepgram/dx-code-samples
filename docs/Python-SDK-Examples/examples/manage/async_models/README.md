### Manage — Models (async)

**Learning objective**: List available models and get details asynchronously.

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
cd sources/Python-SDK-Examples/examples/manage/async_models
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

deepgram = DeepgramClient()

# Get a project id
projects = await deepgram.asyncmanage.v("1").get_projects()
project_id = projects.projects[0].project_id

# List models (STT and TTS)
models = await deepgram.asyncmanage.v("1").get_models()
model_id = None
if models.stt:
    model_id = models.stt[0].uuid
elif models.tts:
    model_id = models.tts[0].uuid

# Model details
model = await deepgram.asyncmanage.v("1").get_model(model_id)

# Project models
project_models = await deepgram.asyncmanage.v("1").get_project_models(project_id)
project_model = await deepgram.asyncmanage.v("1").get_project_model(project_id, model_id)
```

#### Where to add more options
- **Async patterns**: Combine calls with `asyncio.gather(...)` where helpful.
