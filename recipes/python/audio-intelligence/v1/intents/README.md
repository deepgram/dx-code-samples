# Intent Recognition (Audio Intelligence v1)

Detect speaker intents from audio to understand what speakers are trying to accomplish.

## What it does

When `intents=True` is set, Deepgram analyses the transcript to identify speaker intentions — such as requesting information, expressing agreement, making a complaint, or giving instructions. This is valuable for call-centre routing, automated ticket classification, and conversational analytics.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `intents` | `True` | Enable intent recognition |
| `model` | `"nova-3"` | Transcription model |
| `smart_format` | `True` | Format numbers, dates, etc. |

## Example output

```
Transcript: Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...

Intent segments: 2
  Intents: informing — "Yeah, as much as it's worth celebrating the 50th"
  Intents: explaining — "we've come a long way since then"
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
