# Sentiment Analysis (Audio Intelligence v1)

Segment-level positive/negative/neutral sentiment scoring.

## What it does

Analyzes the transcript and assigns a sentiment label (positive, negative, or neutral) to each text segment. This helps understand the emotional tone across different parts of the audio.

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