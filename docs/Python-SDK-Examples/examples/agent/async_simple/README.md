### Agent — Async simple

**Learning objective**: Connect to Agent WebSocket (async), observe events, and keep the session running.

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
cd sources/Python-SDK-Examples/examples/agent/async_simple
python main.py
```

#### Key SDK calls
```python
import asyncio
from deepgram import DeepgramClient, AgentWebSocketEvents, SettingsOptions

dg = DeepgramClient()
conn = dg.agent.asyncwebsocket.v("1")

conn.on(AgentWebSocketEvents.Welcome, lambda *_: print("welcome"))
opts = SettingsOptions()
opts.agent.think.provider.type = "open_ai"
opts.agent.think.provider.model = "gpt-4o-mini"
opts.agent.speak.provider.model = "aura-2-thalia-en"
opts.agent.listen.provider.model = "nova-3"

async def run():
  if await conn.start(opts):
    try:
      while True:
        await asyncio.sleep(1)
    finally:
      await conn.finish()

asyncio.run(run())
```

#### Where to add more options
- Customize `SettingsOptions` for providers, greeting, keyterms, and language.