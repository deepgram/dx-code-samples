# Transcribe Local Audio File (Speech-to-Text v1)

Read a local audio file and send it to Deepgram for transcription.

## What it does

Reads audio bytes from a local file and uploads them directly to Deepgram's pre-recorded transcription endpoint. Use this when your audio is stored locally rather than at a public URL. The response format is identical to URL-based transcription.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"nova-3"` | Transcription model — nova-3 is the most accurate |
| `smart_format` | `true` | Format numbers, currencies, dates automatically |

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