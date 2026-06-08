# Streaming STT with Client-Side Voice Activity Detection (Speech-to-Text v1)

Reduce bandwidth and API costs by sending only speech segments to Deepgram, using client-side VAD to filter silence.

## What it does

Always-on voice applications stream audio continuously, but most of that audio is silence or background noise. This recipe demonstrates a bandwidth-efficient pattern: classify each audio chunk locally using RMS energy (a simple Voice Activity Detection approach), send only chunks containing speech via `send_media()`, and send `send_keep_alive()` during silence to maintain the WebSocket connection. At the end, it reports how many bytes were sent versus total audio — showing the bandwidth savings.

For production use, replace the energy-based VAD with a model-based detector like `silero-vad` or `webrtcvad` for more accurate speech boundary detection, and add a pre-roll buffer (200–300 ms before speech onset) to avoid clipping initial words.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"nova-3"` | Transcription model |
| `smart_format` | `True` | Format numbers, dates, etc. |
| `encoding` | `"linear16"` | Raw PCM audio format for VAD processing |
| `sample_rate` | `16000` | Sample rate matching the decoded audio |
| `THRESHOLD` | `500` | RMS energy threshold — chunks below this are classified as silence |

## SDK methods used

| Method | Purpose |
|--------|---------|
| `conn.send_media(chunk)` | Send speech audio to Deepgram |
| `conn.send_keep_alive()` | Maintain WebSocket during silence periods |
| `conn.send_close_stream()` | Signal end of audio stream |

## Example output

```
[transcript] Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk,
[transcript] it's also worth noting that we've come a long way since then...
[vad] sent 486400/1586400 bytes (69% saved)
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
