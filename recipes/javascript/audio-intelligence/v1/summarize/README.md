# Audio Summarization (Audio Intelligence v1)

Generate a concise text summary of spoken content.

## What it does

Analyzes the transcribed audio and produces a brief summary capturing the key points. This is useful for quickly understanding long recordings without reading the full transcript.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `summarize` | `"v2"` | Enable summarization (use "v2" for latest) |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
Summary: A discussion about the 50th anniversary of the first spacewalk and advances in space exploration.
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```