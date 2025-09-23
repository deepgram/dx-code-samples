### Manage — Balances

**Learning objective**: List balances for a project and fetch balance details.

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
cd sources/Python-SDK-Examples/examples/manage/balances
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient

# Create client
deepgram = DeepgramClient()

# Get a project id
projects = deepgram.manage.v("1").get_projects()
project_id = projects.projects[0].project_id

# List balances and pick one
balances = deepgram.manage.v("1").get_balances(project_id)
balance_id = balances.balances[0].balance_id

# Get a specific balance
balance = deepgram.manage.v("1").get_balance(project_id, balance_id)
```

#### Where to add more options
- **Async**: Use `deepgram.asyncmanage.v("1")` for non-blocking calls.
