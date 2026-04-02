# Profanity Filter (Speech-to-Text v1)

Detects recognized profanity in the audio and replaces it with the nearest non-profane word or removes it from the transcript entirely. Useful for content moderation, public-facing transcripts, and broadcasting applications where clean language is required.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"nova-3"` | Transcription model |
| `profanity_filter` | `True` | Mask or remove profane words from the transcript |
| `smart_format` | `True` | Auto-format numbers, dates, and addresses |

## Example output

```
Yeah, as much as it's worth celebrating the 50th anniversary of
the spacewalk, it's also worth noting that we've come a long way
since then...
```

## Prerequisites

- Python 3.10+
- Set `DEEPGRAM_API_KEY` environment variable
- Install: `pip install -r recipes/python/requirements.txt`

## Run

```bash
python example.py
```

## Test

```bash
pytest example_test.py -v
```
