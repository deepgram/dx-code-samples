# Live Streaming Transcription (Speech-to-Text v1)

Streams audio to Deepgram over WebSocket for real-time transcription.

## What it does

Pipes raw PCM audio into the Deepgram CLI, which opens a WebSocket connection for live streaming transcription. The example uses ffmpeg to convert a WAV file to raw linear16 audio, simulating a live audio source. In production, this could be replaced with a microphone input or any other live audio stream.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `--encoding` | `linear16` | Specifies raw PCM audio format |
| `--model` | `nova-3` | Specifies the Nova 3 transcription model |
| `--smart-format` | (flag) | Enables smart formatting for readable output |

## Example output

```
Yeah, as confirmed, I'd like to inform you that we have had
temporary loss of communication with the ISS.
```

## Prerequisites

- Deepgram CLI installed (`curl -fsSL https://deepgram.com/install.sh | sh`)
- `ffmpeg` installed
- `curl` installed
- Set `DEEPGRAM_API_KEY` environment variable

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```