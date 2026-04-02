# Profanity Filter (STT v1)

Masks profane words in the transcript output with asterisks.

## What it does

The `profanity_filter` parameter tells Deepgram to detect and replace profane or offensive words with asterisks (e.g., "****"). This is useful for generating transcripts that will be shown to a general audience, displayed in public applications, or stored in content-moderated systems.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Deepgram transcription model |
| `profanity_filter` | `true` | Replaces profanity with asterisks |
| `smart_format` | `true` | Enables smart formatting |

## Example output

```
Yeah, as much as, it's funny when I think of anything that's related to
outer space, I think of is the first, the first shuttle launch...
```

## Prerequisites

- Deepgram CLI installed (`curl -fsSL https://deepgram.com/install.sh | sh`)
- `DEEPGRAM_API_KEY` environment variable set

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```
