# Compare Deepgram Models (Speech-to-Text v1)

Transcribe the same audio file with multiple Deepgram models and compare the results side by side. This helps you make an informed model selection by seeing real accuracy and latency differences on your own audio.

## What it does

Sends the same audio URL to Deepgram's pre-recorded transcription endpoint once per model (nova-3, nova-2). For each request it measures wall-clock time and prints the transcript excerpt so you can compare output quality and speed.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"nova-3"` / `"nova-2"` | The transcription model to use for each run |
| `smart_format` | `True` | Automatically format numbers, currencies, dates, and addresses |
| `url` | `"https://dpgr.am/spacewalk.wav"` | Audio URL to transcribe |

## Example output

```
=== nova-3 (1.23s) ===
Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...

=== nova-2 (1.05s) ===
Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...
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
