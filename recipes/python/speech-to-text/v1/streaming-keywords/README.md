# Streaming with Keyword Boosting (Speech-to-Text v1)

Boosts recognition accuracy for domain-specific terms during real-time WebSocket transcription. In multi-turn voice conversations, terms that appeared in earlier turns — product names, proper nouns, technical jargon — can be fed back as `keyterm` values so the model recognises them consistently across the session.

## What it does

Opens a WebSocket connection with a list of key terms derived from prior conversation context. As audio streams in, the model prioritises those terms during recognition. This prevents the model from misrecognising vocabulary it transcribed correctly moments ago, which is critical for healthcare, legal, and financial applications where terminology accuracy matters.

The `keyterm` parameter uses Nova-3's prompt-based boosting. For older models, use `keywords` with intensifier weights instead (e.g., `"spacewalk:2"`).

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"nova-3"` | Required — keyterm prompting requires Nova-3 |
| `smart_format` | `True` | Auto-format numbers, dates, and addresses |
| `keyterm` | `["spacewalk", "ISS", "Alexei Leonov", "Voskhod"]` | Terms from prior context to boost |

## Example output

```
[interim] Yeah as much as it's worth
[final] Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk,
[interim] it's also worth noting
[final] it's also worth noting that we've come a long way since then...
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
