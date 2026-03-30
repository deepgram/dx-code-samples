# Topic Detection (Speech-to-Text v1)

Identifies key topics discussed in the audio content.

## What it does

The `--topics` flag enables topic detection, which analyzes the transcript and identifies the main subjects being discussed. Each detected topic is returned with a confidence score. This is useful for categorizing audio content, building search indexes, or routing calls based on subject matter.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `--model` | `nova-3` | Specifies the Nova 3 transcription model |
| `--topics` | (flag) | Enables topic detection |

## Example output

```
Topic: Space Exploration (0.95)
Topic: International Space Station (0.91)
Topic: Communication Systems (0.84)
```

## Prerequisites

- Deepgram CLI installed (`curl -fsSL https://deepgram.com/install.sh | sh`)
- Set `DEEPGRAM_API_KEY` environment variable

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```