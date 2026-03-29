# Search (Speech-to-Text v1)

Find specific words or phrases in the audio with confidence scores and timing.

## What it does

When enabled, Deepgram searches for the specified terms in the audio and returns their locations with confidence scores. Each match includes start/end timestamps and a text snippet. This is useful for finding key moments in long recordings.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `search` | `["spacewalk", "anniversary"]` | Array of terms to search for |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
Search term: "spacewalk"
  Found at 3.21s (confidence: 0.9876): "the spacewalk"
Search term: "anniversary"
  Found at 2.85s (confidence: 0.9654): "50th anniversary"
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```