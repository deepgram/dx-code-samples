# Multichannel (Speech-to-Text v1)

Transcribe each audio channel independently for multi-track recordings.

## What it does

When enabled, Deepgram transcribes each audio channel separately instead of mixing them. This is ideal for stereo call recordings where each speaker is on a different channel. Each channel gets its own transcript in the response.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `multichannel` | `true` | Enable per-channel transcription |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
--- Channel 0 ---
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