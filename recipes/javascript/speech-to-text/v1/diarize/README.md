# Speaker Diarization (Speech-to-Text v1)

Identify and label individual speakers in audio.

## What it does

When enabled, Deepgram's diarization model assigns a numeric speaker label to each word in the transcript. Speaker 0 is the first speaker detected, Speaker 1 the second, and so on. This is useful for meeting transcripts, interviews, and multi-speaker recordings.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `diarize` | `true` | Enable speaker identification |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
[Speaker 0] Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk,
[Speaker 1] it's also worth noting that we've come a long way since then.
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```