### Speech to Text — Transcribe from URL (REST, sync)

**Learning objective**: Use the Deepgram Python SDK to transcribe an audio file hosted at a URL via the REST API.

#### Prerequisites
- **Python**: 3.10+
- **SDK**: `pip install deepgram-sdk httpx`
- **API key**: Set `DEEPGRAM_API_KEY` in your environment

#### Minimal example
```python
import httpx
from deepgram import DeepgramClient, PrerecordedOptions, UrlSource

AUDIO_URL = "https://dpgr.am/spacewalk.wav"

def main():
    deepgram = DeepgramClient()

    payload: UrlSource = {"url": AUDIO_URL}
    options = PrerecordedOptions(
        model="nova-3",
        smart_format=True,
    )

    response = deepgram.listen.rest.v("1").transcribe_url(
        payload,
        options,
        timeout=httpx.Timeout(300.0, connect=10.0),
    )
    print(response.to_json(indent=4))

if __name__ == "__main__":
    main()
```

#### Where to add more options
- Extend `PrerecordedOptions(...)` for formatting, language, diarization, redaction, etc.