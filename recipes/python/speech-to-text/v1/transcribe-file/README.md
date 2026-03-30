# Transcribe Local Audio File (Speech-to-Text v1)

Read a local audio file into memory and send the raw bytes for transcription using the Deepgram REST API.

## What it does

Loads an audio file from disk and sends it to Deepgram's `transcribe_file()` endpoint. This is useful when you have audio files stored locally (recordings, uploads, etc.) rather than hosted at a URL. The response format is identical to URL-based transcription.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `request` | `bytes` | Raw audio bytes read from the local file |
| `model` | `"nova-3"` | Transcription model — nova-3 is the most accurate for most use cases |
| `smart_format` | `True` | Automatically format numbers, currencies, dates, and addresses |

## Example output

```
Downloaded 4379648 bytes
Yeah, as much as it's worth celebrating the 50th anniversary of
the spacewalk, it's also worth noting that we've come a long way
since then...
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
