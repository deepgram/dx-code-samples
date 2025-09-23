### Text to Speech — Stream synthesis over WebSocket (async)

**Learning objective**: Connect to the TTS WebSocket, send text, and receive audio; optionally enable playback.

#### Prerequisites
- **Python**: 3.10+
- **API key**: Set `DEEPGRAM_API_KEY` in your environment or `.env`
- **Install deps** (from the examples root):
```bash
cd sources/Python-SDK-Examples/examples
pip install -r requirements-examples.txt
```
- Optional: Enable speaker playback by setting `speaker_playback` in client options.

#### Run
```bash
cd sources/Python-SDK-Examples/examples/text-to-speech/websocket/async_simple
python main.py
```

#### Key SDK calls
```python
from deepgram import (
    DeepgramClient,
    DeepgramClientOptions,
    SpeakWebSocketEvents,
    SpeakWSOptions,
)

# Client with optional playback
deepgram = DeepgramClient(
    "",
    DeepgramClientOptions(options={"speaker_playback": "true"})
)

dg = deepgram.speak.asyncwebsocket.v("1")

dg.on(SpeakWebSocketEvents.AudioData, on_binary_data)

options = SpeakWSOptions(
    model="aura-2-thalia-en",
    encoding="linear16",
    sample_rate=16000,
)

if await dg.start(options):
    await dg.send_text("Hello from Deepgram!")
    await dg.flush()
    await dg.wait_for_complete()
    await dg.finish()
```

#### Where to add more options
- Extend `SpeakWSOptions(...)` with fields like `voice`, `stability`, `format`.
- Client options: `auto_flush_speak_delta`, `speaker_playback`.
