# Entity Detection (Audio Intelligence v1)

Identify named entities: people, organisations, locations in audio.

## What it does

Detects named entities in the transcript and classifies them by type (person, organisation, location, date, etc.). Each entity includes its type, value, and confidence score.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `detect_entities` | `true` | Enable named entity detection |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
PER: Alexei Leonov (confidence: 0.9211)
LOC: Russia (confidence: 0.8754)
DATE: March of 1965 (confidence: 0.9102)
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```