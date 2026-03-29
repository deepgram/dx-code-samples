# Transcribe Audio from URL (Speech-to-Text v2)

Transcribe audio using the v2 API with the flux-general-en model for high-accuracy English transcription.

## What it does

Uses the v2 API endpoint with the flux-general-en model, which is optimized for English audio. The v2 API provides enhanced accuracy for English-language content.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"flux-general-en"` | English-optimized model for v2 API |
| `smart_format` | `true` | Enable formatting |

## Example output

```
Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```