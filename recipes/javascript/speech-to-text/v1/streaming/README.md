# Live Streaming Transcription (Speech-to-Text v1)

WebSocket-based real-time transcription from live audio.

## What it does

Connects to Deepgram's WebSocket endpoint and streams audio for real-time transcription. Results arrive as the audio is processed, including interim (partial) results and final results. This recipe streams a pre-recorded file to simulate live audio input.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"nova-3"` | Transcription model |
| `smart_format` | `"true"` | Enable formatting (string for WebSocket params) |
| `interim_results` | `"true"` | Receive partial results while audio streams |

## Example output

```
Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk,
it's also worth noting that we've come a long way since then.
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```