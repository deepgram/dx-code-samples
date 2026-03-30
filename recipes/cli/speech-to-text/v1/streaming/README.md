# Live Streaming Transcription (Speech-to-Text v1)

Real-time transcription via WebSocket from a live audio stream.

## What it does

Opens a WebSocket connection to Deepgram's `/v1/listen` endpoint and streams audio data in real time. Transcript results are returned as JSON messages as speech is recognised. This recipe streams audio from a URL as a demonstration of the pattern.

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
