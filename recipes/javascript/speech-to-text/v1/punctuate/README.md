# Punctuation (Speech-to-Text v1)

Add punctuation marks to the transcript output.

## What it does

When enabled, Deepgram's punctuation model adds periods, commas, question marks, and other punctuation to the raw transcript. This makes the output readable without manual editing. For additional formatting (numbers, dates, currencies), use `smart_format` instead.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `punctuate` | `true` | Enable automatic punctuation |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk, it's also worth noting...
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```