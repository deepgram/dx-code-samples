# Combined Audio Intelligence (Audio Intelligence v1)

Enable every audio intelligence feature in a single API call — sentiment analysis, topic detection, intent recognition, entity detection, and summarization — to get the full analytical picture from one request with no redundant calls.

## What it does

Deepgram's Audio Intelligence features can all be activated together as transcription parameters. Instead of making five separate requests for sentiment, topics, intents, entities, and summarization, you pass all the flags in one call. The response includes the transcript alongside every intelligence result, making this ideal for call analytics pipelines, compliance monitoring, or conversation intelligence platforms.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `sentiment` | `True` | Segment-level positive/negative/neutral scoring |
| `topics` | `True` | Identify key topics discussed |
| `intents` | `True` | Detect speaker intents |
| `detect_entities` | `True` | Extract named entities (people, places, orgs) |
| `summarize` | `"v2"` | Generate a concise summary |
| `model` | `"nova-3"` | Transcription model |
| `smart_format` | `True` | Format numbers, dates, etc. |

## Example output

```
Transcript: Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...

Summary: The discussion covers the history and evolution of spacewalks...

Sentiment segments: 4
  [positive] Yeah, as much as it's worth celebrating the 50th anniversary
  [neutral] it's also worth noting that we've come a long way
  [positive] The technology has improved dramatically

Topic segments: 3
  Space Exploration, History
  Technology, Innovation
  NASA, Government

Intent segments: 2
  Informing
  Expressing Opinion

Entities: 5
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
