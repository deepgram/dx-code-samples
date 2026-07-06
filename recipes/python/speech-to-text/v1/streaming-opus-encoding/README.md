# Streaming Transcription with Opus Encoding (Speech-to-Text v1)

Stream Opus-encoded audio over WebSocket instead of raw PCM to dramatically reduce bandwidth while maintaining identical transcription quality.

## What it does

Deepgram's streaming WebSocket API accepts multiple audio encodings — not just raw PCM. By sending Opus-encoded audio (with `encoding=opus`), you can reduce bandwidth by 10–20x compared to uncompressed linear16 PCM. This is critical for mobile apps, browser-based voice pipelines, and bandwidth-constrained environments. Transcription quality remains identical because Deepgram decodes the Opus audio server-side before running the model.

This recipe downloads a WAV file, converts it to Opus using ffmpeg, then streams the compressed audio over WebSocket. It prints the byte-size comparison so you can see the bandwidth savings.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"nova-3"` | Transcription model |
| `encoding` | `"opus"` | Tells Deepgram the incoming audio is Opus-encoded |
| `sample_rate` | `48000` | Sample rate of the Opus audio (48 kHz is standard for Opus) |
| `smart_format` | `True` | Format numbers, dates, etc. |

## Example output

```
PCM: 4379648 bytes → Opus: 220184 bytes (19.9x smaller)
Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk,
it's also worth noting that we've come a long way since then...
```

## When to use Opus vs PCM

- **Opus**: mobile apps, browser MediaRecorder, bandwidth-limited networks, cost-sensitive streaming
- **PCM (linear16)**: lowest latency, no encoding overhead, local/server-side processing

## Prerequisites

- Python 3.10+
- [ffmpeg](https://ffmpeg.org/) installed and on PATH
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
