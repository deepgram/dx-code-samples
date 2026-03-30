# Stream Audio Response (Text-to-Speech v1)

Stream TTS audio chunks as they generate, enabling playback before the full response arrives.

## What it does

The `generate()` method returns an iterator of byte chunks. Audio data arrives incrementally as it is produced by the API, rather than waiting for the entire audio to be generated. This is ideal for real-time playback scenarios where low latency matters — you can start playing audio from the first chunk while the rest is still being generated.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `text` | `str` | The text to convert to speech |
| `model` | `"aura-2-thalia-en"` | Voice model |
| `encoding` | `"linear16"` | Raw PCM encoding for streaming |

## Example output

```
Received 12 chunks, 48000 bytes total
```

## Prerequisites

- Python 3.10+
- Set `DEEPGRAM_API_KEY` environment variable
- Install: `pip install -r recipes/python/requirements.txt`

## Run

```bash
python example.py
```

## Test

```bash
pytest example_test.py -v
```
