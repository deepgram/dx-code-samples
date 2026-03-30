# Transcribe Audio from URL — v2 API (Speech-to-Text v2)

Use the v2 API with the flux-general-en model for high-accuracy English transcription.

## What it does

Sends an audio URL to the `/v2/listen` endpoint using the `flux-general-en` model, which is optimised specifically for English audio. The v2 API provides enhanced accuracy for English-only workloads compared to the general v1 endpoint.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `flux-general-en` | English-optimised high-accuracy model (v2 only) |
| `smart_format` | `true` | Formats numbers, dates, currencies |

## Example output

```
Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...
```

## Prerequisites

- `curl` and `python3` installed
- Set `DEEPGRAM_API_KEY` environment variable

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```
