# In-Band Reconfiguration — v2 API (Speech-to-Text v2)

Update transcription configuration mid-stream without disconnecting, using the v2 WebSocket `Configure` message.

## What it does

Deepgram Flux is the only STT provider that supports updating transcription parameters during an active streaming session. This recipe opens a v2 WebSocket connection, streams the first half of an audio file, then sends a `Configure` message to inject domain-specific keyterms and adjust the end-of-turn threshold — all without closing or reopening the connection. The second half of the audio benefits from the updated configuration immediately.

This is critical for voice agents that need to adapt to conversation context — for example, adding medical terminology after detecting a healthcare topic, or tightening turn detection for rapid-fire Q&A.

## Key parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `keyterms` | `list[str]` or `str` | Boost recognition of specific terms (e.g., brand names, acronyms) |
| `thresholds.eot_threshold` | `float` (0.5–0.9) | End-of-turn confidence required to finish a turn |
| `thresholds.eager_eot_threshold` | `float` | Threshold for eager (early) end-of-turn detection |
| `thresholds.eot_timeout_ms` | `int` | Timeout in milliseconds for end-of-turn detection |
| `language_hints` | `list[str]` | Language hints for `flux-general-multi` model |

## Example output

```
[turn 0] Yeah, as much as it's worth celebrating the
Sent mid-stream reconfiguration
Config applied: keyterms=['spacewalk', 'EVA', 'ISS']
[turn 0] 50th anniversary of the spacewalk, it's also worth noting
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
