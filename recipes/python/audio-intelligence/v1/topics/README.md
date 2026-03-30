# Topic Detection (Audio Intelligence v1)

Identify key topics discussed in audio content for categorisation and indexing.

## What it does

When `topics=True` is set, Deepgram analyses the transcript to identify what subjects are being discussed. Each topic segment includes the detected topic names and the associated text. This is useful for auto-tagging meetings, categorising podcast episodes, or building content search indexes.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `topics` | `True` | Enable topic detection |
| `model` | `"nova-3"` | Transcription model |
| `smart_format` | `True` | Format numbers, dates, etc. |

## Example output

```
Transcript: Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...

Topic segments: 3
  Topics: space exploration, history — "Yeah, as much as it's worth celebrating the 50th"
  Topics: technology — "we've come a long way since then"
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
