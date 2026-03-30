# Audio Summarization (Audio Intelligence v1)

Generate a concise text summary of spoken audio content alongside the transcript.

## What it does

When `summarize="v2"` is set, Deepgram produces a brief summary of the audio content in addition to the full transcript. This is useful for automatically generating meeting notes, podcast highlights, call summaries, or any scenario where a quick overview of audio content is needed.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `summarize` | `"v2"` | Enable summarization (v2 is the current version) |
| `model` | `"nova-3"` | Transcription model |
| `smart_format` | `True` | Format numbers, dates, etc. |

## Example output

```
Transcript: Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...

Summary: The discussion covers the 50th anniversary of the first spacewalk and how space technology has evolved significantly since then.
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
