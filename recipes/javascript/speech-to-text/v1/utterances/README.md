# Utterances (Speech-to-Text v1)

Split the transcript into per-utterance segments with start and end timing.

## What it does

When enabled, Deepgram splits the transcript at natural pauses in speech, returning an array of utterance objects. Each utterance includes the text, start time, end time, and confidence score. Combine with `diarize` for speaker-attributed utterances.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `utterances` | `true` | Enable utterance segmentation |
| `utt_split` | `0.8` | Optional pause threshold in seconds for splitting |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
[0.08s - 6.93s] Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...
[7.42s - 12.85s] The first spacewalk was conducted by Russian cosmonaut Alexei Leonov...
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```