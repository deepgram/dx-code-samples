# Language Detection (Speech-to-Text v1)

Automatically detect the spoken language in audio.

## What it does

When enabled, Deepgram identifies the language spoken in the audio and includes it in the response. This eliminates the need to specify a language parameter upfront and is useful for processing audio in unknown or mixed languages.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `detect_language` | `true` | Enable automatic language detection |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
Detected language: en
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