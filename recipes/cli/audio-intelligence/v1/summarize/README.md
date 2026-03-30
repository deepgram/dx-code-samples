# Audio Summarization (Audio Intelligence v1)

Generate a concise text summary of spoken audio content.

## What it does

Sends audio to the `/v1/listen` endpoint with `summarize=v2` to produce an AI-generated summary alongside the full transcript. The summary captures the key points of the audio in a single sentence. This is an Audio Intelligence feature.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Required model for summarization |
| `summarize` | `v2` | Enables AI summarization (string "v2", not boolean) |

## Example output

```
Summary: A discussion about the 50th anniversary of the first spacewalk and advances in space technology.
Transcript: Yeah, as much as it's worth celebrating the 50th anniversary...
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
