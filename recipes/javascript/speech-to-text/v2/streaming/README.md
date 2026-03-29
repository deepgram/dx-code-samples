# Live Streaming Transcription (Speech-to-Text v2)

WebSocket streaming with the v2 listen endpoint using flux-general-en.

## What it does

Connects to Deepgram's v2 WebSocket endpoint and streams audio for real-time transcription using the flux-general-en model. The v2 API returns TurnInfo messages with turn-based transcription results.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"flux-general-en"` | English-optimized v2 model |

## Example output

```
Turn: {"type":"TurnInfo","turn_index":0,...}
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```