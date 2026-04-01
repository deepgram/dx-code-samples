# Live Streaming Transcription (STT v2)

WebSocket streaming with the v2/listen endpoint using the flux-general-en model.

## What it does

Streams audio over a WebSocket connection using the v2 API endpoint. The `flux-general-en` model provides high-accuracy English transcription. The CLI automatically detects the flux model and routes to the v2 endpoint.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `--model` | `flux-general-en` | High-accuracy English model (v2) |
| `--encoding` | `linear16` | Raw audio encoding for stdin streams |

## Example output

```
Yeah, as much as it's funny when I think of anything that's related to outer space...
```

## Prerequisites

- Deepgram CLI installed (`curl -fsSL https://deepgram.com/install.sh | sh`)
- `ffmpeg` installed
- `DEEPGRAM_API_KEY` environment variable set

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```
