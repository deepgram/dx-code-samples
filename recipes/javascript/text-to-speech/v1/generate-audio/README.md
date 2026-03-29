# Generate Audio to File (Text-to-Speech v1)

Convert text to audio and save as a file using the Deepgram TTS REST API.

## What it does

Sends text to Deepgram's text-to-speech endpoint and receives synthesized audio back. The audio is saved to a local file. The aura-2 voice models produce natural-sounding speech.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `text` | `"Hello..."` | Text to convert to speech |
| `model` | `"aura-2-thalia-en"` | Voice model to use |
| `encoding` | `"linear16"` | Audio encoding format |
| `container` | `"wav"` | Audio container format |

## Example output

```
Audio saved: output.wav (142080 bytes)
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```