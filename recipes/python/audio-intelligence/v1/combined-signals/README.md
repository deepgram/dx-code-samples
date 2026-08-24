# Combined Audio Intelligence Signals (v1)

Enable sentiment analysis, topic detection, intent recognition, and summarization in a single pre-recorded transcription request. This lets you see how conversation tone, subject matter, and speaker intent relate across the same audio — insights that are invisible when features are used in isolation.

## What it does

A single API call with multiple Audio Intelligence flags returns the transcript alongside all four signal types. You can correlate sentiment shifts with topic changes, or see which intents appear alongside positive or negative segments, without making separate requests.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `sentiment` | `True` | Score each segment as positive, negative, or neutral |
| `topics` | `True` | Detect key topics per segment |
| `intents` | `True` | Identify speaker intents per segment |
| `summarize` | `"v2"` | Generate a concise summary of the audio |
| `model` | `"nova-3"` | Transcription model |
| `smart_format` | `True` | Format numbers, dates, etc. |

## Example output

```
Transcript: Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk and...

Summary: The discussion covers the history and evolution of spacewalks...

Sentiment segments: 4
  [positive] Yeah, as much as it's worth celebrating the 50th anniversary
  [neutral] it's also worth noting that we've come a long way since then
  [positive] The technology has really advanced

Topic segments: 3
  Topics: space exploration, spacewalk history
  Topics: technology advancement
  Topics: future missions

Intent segments: 2
  Intents: inform
  Intents: educate
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
