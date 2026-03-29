# Intent Recognition (Speech-to-Text v1)

Detect speaker intents in the transcript.

## What it does

When enabled, Deepgram analyzes the transcript to identify the intent behind what speakers are saying. Each intent comes with a confidence score. This is useful for call routing, chatbot enhancement, and understanding customer needs.

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