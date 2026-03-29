# Topic Detection (Audio Intelligence v1)

Identify key topics discussed in audio content.

## What it does

Analyzes the transcript and detects the main topics discussed. Each topic includes a confidence score. This is useful for categorizing audio content automatically.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `topics` | `true` | Enable topic detection |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
Topic: space exploration (confidence: 0.9534)
Topic: astronauts (confidence: 0.8821)
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```