# Select Audio Encoding (Text-to-Speech v1)

Choose the output audio encoding format for TTS audio.

## What it does

Deepgram supports multiple audio encoding formats for TTS output. Different encodings offer trade-offs between file size, quality, and compatibility. MP3 provides good compression for web delivery, while linear16 gives uncompressed PCM quality.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `encoding` | `"mp3"` | Audio encoding: linear16, mp3, opus, flac, aac, mulaw |
| `container` | `"none"` | Container format: "none" for raw stream, "wav" for linear16 |
| `model` | `"aura-2-thalia-en"` | Voice model |

## Example output

```
Generated MP3 audio: 12480 bytes
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```