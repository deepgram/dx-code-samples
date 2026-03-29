# Topic Detection (Speech-to-Text v1)

Identify topics discussed in the audio.

## What it does

When enabled, Deepgram analyzes the transcript and identifies the main topics discussed. Each topic comes with a confidence score indicating how strongly it was detected. This is useful for categorizing and routing audio content.

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