# WebSocket Streaming TTS (Text-to-Speech v1)

Low-latency text-to-speech via WebSocket for real-time use cases.

## What it does

Connects to Deepgram's WebSocket TTS endpoint and sends text for real-time audio generation. Audio chunks arrive as the text is synthesized, enabling low-latency playback. Send a Flush message to signal the end of a text segment.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"aura-2-thalia-en"` | Voice model |
| `encoding` | `"linear16"` | Audio encoding format |

## Example output

```
Received Flushed event. Total audio: 96000 bytes
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```