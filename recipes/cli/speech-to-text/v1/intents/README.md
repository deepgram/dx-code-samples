# Intent Recognition (Speech-to-Text v1)

Detects speaker intents in the transcript.

## What it does

The `--intents` flag enables intent recognition, which analyzes the transcript to determine what speakers are trying to accomplish. Each detected intent is returned with a confidence score. This is useful for call center routing, understanding customer needs, and automating response workflows.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `--model` | `nova-3` | Specifies the Nova 3 transcription model |
| `--intents` | (flag) | Enables intent recognition |

## Example output

```
Intent: Inform/Report (0.92)
Intent: Request Action (0.78)
```

## Prerequisites

- Deepgram CLI installed (`curl -fsSL https://deepgram.com/install.sh | sh`)
- Set `DEEPGRAM_API_KEY` environment variable

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```