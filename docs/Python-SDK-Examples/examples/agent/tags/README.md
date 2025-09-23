### Agent — Add tags to sessions

**Learning objective**: Attach tags to Agent sessions for observability and testing.

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
cd sources/Python-SDK-Examples/examples/agent/tags
python main.py
```

#### Key SDK calls
```python
from deepgram import DeepgramClient, AgentWebSocketEvents, SettingsOptions

dg = DeepgramClient()
conn = dg.agent.asyncwebsocket.v("1")
opts = SettingsOptions()
opts.tags = ["production-test", "sdk-example", "agent-websocket", "tags-validation"]

await conn.start(opts)
```

#### Where to add more options
- Combine tags with provider and model settings to label production tests.