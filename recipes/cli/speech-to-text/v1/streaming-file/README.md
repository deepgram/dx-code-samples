# Stream Audio File for Transcription (Speech-to-Text v1)

Stream a local audio file over WebSocket for real-time transcription.

## What it does

Downloads an audio file locally, then pipes it into a WebSocket connection to Deepgram's streaming transcription endpoint. This demonstrates the file-streaming pattern — useful when you want streaming-style results from a pre-existing file rather than using the REST API.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Highest-accuracy transcription model |
| `smart_format` | `true` | Formats numbers, dates, currencies |
| `encoding` | `linear16` | Audio encoding format |
| `sample_rate` | `8000` | Audio sample rate in Hz |

## Example output

```
Yeah as much as it's worth celebrating
the 50th anniversary of the spacewalk
```

## Prerequisites

- `curl`, `python3`, and `websocat` installed
- Set `DEEPGRAM_API_KEY` environment variable

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```
