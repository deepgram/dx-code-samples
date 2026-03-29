# Stream Audio File for Transcription (Speech-to-Text v1)

Stream a local audio file over WebSocket for incremental transcription.

## What it does

Opens a WebSocket connection and sends audio data in chunks, receiving transcription results incrementally. Unlike the REST API which returns results only after processing the entire file, WebSocket streaming provides partial results as audio is consumed.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"nova-3"` | Transcription model |
| `smart_format` | `"true"` | Enable formatting |

## Example output

```
Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk, it's also worth noting that we've come a long way since then.
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```