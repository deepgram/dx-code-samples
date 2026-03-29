# Stream Audio Response (Text-to-Speech v1)

Stream TTS audio as it generates via the REST API.

## What it does

Sends text to Deepgram's TTS endpoint and streams the audio response in chunks as they arrive. This allows processing or playing audio before the full response is complete, reducing time-to-first-byte.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `text` | `"Hello..."` | Text to convert to speech |
| `model` | `"aura-2-thalia-en"` | Voice model |
| `encoding` | `"linear16"` | Raw PCM audio encoding |
| `container` | `"wav"` | Audio container format |

## Example output

```
Streamed 5 chunks, 142080 bytes total
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```