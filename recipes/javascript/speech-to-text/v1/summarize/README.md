# Summarize (Speech-to-Text v1)

Generate a concise summary of the transcript.

## What it does

When enabled, Deepgram generates a brief text summary of the transcribed audio content. The summary captures the key points and themes discussed. This saves time when processing long recordings where you need a quick overview.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `summarize` | `"v2"` | Enable summarization (use "v2" for latest) |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
Summary: A discussion about the 50th anniversary of the first spacewalk and the evolution of space exploration technology since then.

Full transcript: Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk...
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```