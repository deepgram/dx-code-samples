# Intent Recognition (Audio Intelligence v1)

Detect caller/speaker intents from audio context.

## What it does

Analyzes the transcript to identify the intent behind what speakers are saying. Each segment receives intent labels with confidence scores. Useful for call routing and understanding customer needs.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `intents` | `true` | Enable intent detection |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
Intent: inform (confidence: 0.8932)
  Text: "as much as it's worth celebrating the 50th anniversary"
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```