# Sentiment Analysis (Speech-to-Text v1)

Analyze sentiment (positive, negative, neutral) per segment of the transcript.

## What it does

When enabled, Deepgram assigns a sentiment label to each segment of the transcript. Segments are classified as positive, negative, or neutral with an associated confidence score. This helps understand the emotional tone of conversations.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `sentiment` | `true` | Enable sentiment analysis |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
[positive] Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk,
[neutral] it's also worth noting that we've come a long way since then.
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```