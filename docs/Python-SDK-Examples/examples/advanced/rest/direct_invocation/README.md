### Advanced — Direct REST invocation

**Learning objective**: Invoke REST transcription with an explicit client configuration using `ListenRESTClient`.

#### Prerequisites

- **Python**: 3.10+
- **Install SDK**:

```bash
pip install deepgram-sdk
```

- **API key**: Set `DEEPGRAM_API_KEY` in your environment

#### Minimal example

```python
from deepgram import ClientOptionsFromEnv, PrerecordedOptions, ListenRESTClient

# Create a REST client using environment-based configuration
client = ListenRESTClient(ClientOptionsFromEnv())

# Transcribe audio from a URL
audio_url = {
    "url": "https://static.deepgram.com/examples/Bueller-Life-moves-pretty-fast.wav"
}

options = PrerecordedOptions(
    model="nova-3",
    smart_format=True,
    summarize="v2",
)

response = client.transcribe_url(audio_url, options)
print(response.to_json(indent=4))
```

#### Where to add more options

- Add to `PrerecordedOptions(...)` (e.g., `language`, `diarize`, `utterances`, `keywords`).
