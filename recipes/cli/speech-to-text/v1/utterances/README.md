# Utterances (Speech-to-Text v1)

Splits the transcript into per-utterance segments with precise start and end timing.

## What it does

Enables the `utterances` parameter which breaks the transcript into individual utterances — continuous stretches of speech separated by pauses. Each utterance includes start time, end time, and transcript text. Useful for subtitles, turn-based dialogue, or timestamped logs.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Highest-accuracy transcription model |
| `utterances` | `true` | Splits transcript into timed utterance segments |

## Example output

```
[0.96s - 6.38s] Yeah, as much as it's worth celebrating...
[7.12s - 12.50s] And there were other things happening...
```

## Prerequisites

- `curl` and `python3` installed
- Set `DEEPGRAM_API_KEY` environment variable

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```
