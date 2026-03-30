# Speaker Diarization (Speech-to-Text v1)

Identifies and labels individual speakers in audio, showing who said what.

## What it does

Enables the `diarize` parameter which assigns a numeric speaker label (Speaker 0, Speaker 1, ...) to each word in the transcript. Speaker labels are consistent within a single request. Useful for meeting transcripts, interviews, and call recordings.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Highest-accuracy transcription model |
| `diarize` | `true` | Assigns speaker labels to each word |
| `smart_format` | `true` | Improves formatting of speaker segments |

## Example output

```
[Speaker 0] Yeah, as much as it's worth celebrating...
[Speaker 1] And there were other things happening...
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
