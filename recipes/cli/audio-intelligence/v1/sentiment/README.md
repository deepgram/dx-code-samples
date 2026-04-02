# Sentiment Analysis (Audio Intelligence v1)

Analyses spoken content for emotional tone at the segment level.

## What it does

Enables the `sentiment` parameter which scores each transcript segment as positive, negative, or neutral. Each segment includes the sentiment label, a confidence score, and the associated text. This is useful for gauging caller satisfaction in support calls, audience reaction in meetings, or overall tone in media content.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Required model for sentiment analysis |
| `sentiment` | `true` | Enables segment-level sentiment scoring |

## Example output

```
positive: it was really a wonderful experience to be out there
neutral: the first spacewalk lasted about twelve minutes
```

## Prerequisites

- Deepgram CLI installed (`curl -fsSL https://deepgram.com/install.sh | sh`)
- `python3` installed
- Set `DEEPGRAM_API_KEY` environment variable

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```
