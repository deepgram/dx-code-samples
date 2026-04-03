# Live Streaming Transcription (STT v2)

WebSocket-based real-time transcription using the v2 API with the flux-general-en model.

## What it does

Streams raw audio over a WebSocket connection for real-time transcription using Deepgram's v2 endpoint. This example uses `ffmpeg` to convert a WAV file into raw linear16 audio and pipes it to `dg listen`. When a `flux-*` model is specified, the CLI automatically routes to the `/v2/listen` WebSocket endpoint, providing higher accuracy for English audio. In production, replace the ffmpeg source with a microphone (`--mic`) or any live audio stream.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `--model` | `flux-general-en` | High-accuracy English model (v2) |
| `--encoding` | `linear16` | Raw audio encoding format |

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
