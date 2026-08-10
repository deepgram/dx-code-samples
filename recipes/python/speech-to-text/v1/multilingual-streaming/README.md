# Multilingual Code-Switching — Streaming (Speech-to-Text v1)

Real-time transcription of multilingual audio where speakers switch between languages mid-conversation.

## What it does

Opens a WebSocket connection to Deepgram's v1 streaming API with `language="multi"`, enabling Nova-3 to detect and transcribe multiple languages within a single session. Unlike setting a specific language code, `multi` mode identifies the spoken language per utterance and returns it in the `detected_language` field. This allows a single stream to handle bilingual conversations, code-switching (e.g., English-to-Spanish mid-sentence), and multilingual meetings without requiring separate sessions per language.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"nova-3"` | Required — multilingual support is a Nova-3 capability |
| `language` | `"multi"` | Enables automatic per-utterance language detection and code-switching |
| `smart_format` | `True` | Format numbers, dates, and punctuation across detected languages |
| `interim_results` | `False` | Only emit final results (set `True` for partial transcripts) |

## Example output

```
[en] Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk,
[en] it's also worth noting that we've come a long way since then.
[en] So let's take a look back at the history of spacewalking.
```

With multilingual audio containing code-switching, output would show language transitions:

```
[en] Welcome to our bilingual presentation.
[es] Bienvenidos a nuestra presentación bilingüe.
[en] Today we'll be switching between English and Spanish.
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
