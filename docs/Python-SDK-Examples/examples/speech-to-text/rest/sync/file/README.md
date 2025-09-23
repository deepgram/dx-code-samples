### Speech to Text — Transcribe a local file (REST, sync)

**Learning objective**: Use the Deepgram Python SDK to transcribe a local audio file via the REST API.

#### Prerequisites
- **Python**: 3.10+
- **SDK**: `pip install deepgram-sdk httpx`
- **API key**: Set `DEEPGRAM_API_KEY` in your environment

#### Minimal example
```python
import httpx
from deepgram import DeepgramClient, PrerecordedOptions, FileSource

FILENAME = "preamble.wav"

def main():
    deepgram = DeepgramClient()  # uses DEEPGRAM_API_KEY from env

    with open(FILENAME, "rb") as f:
        payload: FileSource = {"buffer": f.read()}

    options = PrerecordedOptions(
        model="nova-3",
        smart_format=True,
        # diarize=True, utterances=True, punctuate=True, ...
    )

    response = deepgram.listen.rest.v("1").transcribe_file(
        payload,
        options,
        timeout=httpx.Timeout(300.0, connect=10.0),
    )
    print(response.to_json(indent=4))

if __name__ == "__main__":
    main()
```

#### Where to add more options
- Add fields to `PrerecordedOptions(...)` to control model and output.
- See SDK and API docs for parameters like `diarize`, `utterances`, `language`, `redact`.