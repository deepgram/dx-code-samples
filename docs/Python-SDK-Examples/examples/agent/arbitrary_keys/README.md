### Agent — Validation: arbitrary keys should fail

**Learning objective**: Demonstrate that unknown fields in the Agent settings payload are rejected.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY`
- **Install deps**:
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```

#### Run
```bash
cd sources/Python-SDK-Examples/examples/agent/arbitrary_keys
python main.py
```

#### Expected outcome
- The example intentionally sets `options.agent.speak.provider.arbitrary_key = "test"`.
- Starting the connection should return an error from the API showing the invalid key was sent.

#### Key SDK calls
```python
from deepgram import DeepgramClient, AgentWebSocketEvents
from deepgram.clients.agent.v1.websocket.options import SettingsOptions

dg = DeepgramClient()
conn = dg.agent.websocket.v("1")
opts = SettingsOptions()
opts.agent.speak.provider.arbitrary_key = "test"  # invalid by design
print(conn.start(opts))  # should fail
```

#### Where to add more options
- Remove the arbitrary key and set valid provider fields to make the session succeed.