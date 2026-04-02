# Dictation Mode (STT v1)

Interprets spoken punctuation commands as formatting instructions instead of literal words.

## What it does

The `dictation` parameter enables dictation mode in Deepgram's transcription engine. When a speaker says words like "period", "comma", "new line", or "new paragraph", they are converted into the corresponding punctuation or formatting rather than being transcribed literally. This is useful for dictation workflows where users speak punctuation aloud.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Deepgram transcription model |
| `dictation` | `true` | Enables dictation-style spoken punctuation formatting |
| `smart_format` | `true` | Enables smart formatting alongside dictation |

## Example output

```
Yeah, as much as, it's funny when I think of anything that's related to
outer space. I think of is the first, the first shuttle launch...
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
