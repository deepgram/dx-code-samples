# Topic Detection (Audio Intelligence v1)

Identify key topics discussed in audio content.

## What it does

Sends audio to the `/v1/listen` endpoint with `topics=true` to detect the main topics discussed. Returns topic segments with confidence scores, useful for categorising and tagging audio content automatically.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Required model for topic detection |
| `topics` | `true` | Enables topic identification |

## Example output

```
Topic: space exploration (confidence: 0.95)
Topic: astronaut activities (confidence: 0.87)
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
