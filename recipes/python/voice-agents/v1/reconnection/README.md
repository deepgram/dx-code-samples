# Voice Agent Reconnection with Exponential Backoff (Voice Agents v1)

Automatically reconnect to a Deepgram voice agent WebSocket session when connections drop, using exponential backoff with jitter to avoid thundering-herd problems.

## What it does

Wraps the voice agent WebSocket connection in a retry loop. When a connection fails — due to network interruption, server disconnect, or transient error — the client waits an exponentially increasing delay (with random jitter) before retrying. This prevents hammering the server during outages and gives transient issues time to resolve. On successful connection, the agent session is reconfigured and resumes operation.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `BASE_DELAY` | `0.5` | Initial backoff delay in seconds |
| `MAX_DELAY` | `16.0` | Maximum backoff cap in seconds |
| `MAX_RETRIES` | `5` | Maximum number of reconnection attempts |
| Jitter | `0–0.5s` | Random jitter added to each delay to decorrelate retries |

## Backoff formula

```
delay = min(BASE_DELAY * 2^(attempt-1), MAX_DELAY) + random(0, 0.5)
```

Retry sequence (approximate): 0.5s → 1.0s → 2.0s → 4.0s → 8.0s

## Example output

```
[attempt 1] Connected — settings applied
Audio: 8192 bytes
Agent: Hello! How can I help you today?
Audio: 4096 bytes
```

If the first connection fails:

```
[attempt 1] Failed: connection refused — retrying in 0.7s
[attempt 2] Connected — settings applied
Agent: Hello! How can I help you today?
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
pytest example_test.py -v --timeout=120
```
