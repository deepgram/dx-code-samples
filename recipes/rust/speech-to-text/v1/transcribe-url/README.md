# Transcribe URL

Transcribes audio from a URL using Deepgram's pre-recorded speech-to-text API. This demonstrates the most basic transcription workflow without any additional features enabled.

## What this feature does

The pre-recorded transcription API accepts audio from various sources (URL, file, buffer) and returns a text transcript. This example uses a URL source, which is convenient for testing and demos since no local files are needed.

## Key parameters

- **AudioSource::from_url()**: Specifies audio source as a URL
- **model**: Specifies which Deepgram model to use (Nova-3 in this example)

## Sample output

When you run this example with the demo audio, you'll see output like:

```
NASA that's one small step for man one giant leap for mankind
```

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Internet connection to fetch the audio URL

## Run the example

```bash
cargo run
```