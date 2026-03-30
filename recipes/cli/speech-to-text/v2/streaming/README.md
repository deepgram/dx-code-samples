# Live Streaming Transcription — v2 API (Speech-to-Text v2)

WebSocket streaming with the v2/listen endpoint using the flux-general-en model.

## What it does

Opens a WebSocket connection to the `/v2/listen` endpoint using the `flux-general-en` model for high-accuracy English streaming transcription. Audio is piped from a demo file and transcript lines are printed as they arrive.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `flux-general-en` | English-optimised high-accuracy model (v2 only) |
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
