# Paragraphs (Speech-to-Text v1)

Group transcript output into paragraph blocks based on natural speech pauses.

## What it does

When enabled, Deepgram analyzes speech patterns and groups the transcript into paragraphs. Each paragraph contains sentences with their text and timing information. This is useful for generating readable documents from audio.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `paragraphs` | `true` | Enable paragraph grouping |
| `smart_format` | `true` | Enable formatting (recommended with paragraphs) |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
Yeah, as much as it's worth celebrating the 50th anniversary of the spacewalk, it's also worth noting that we've come a long way since then.

The first spacewalk was conducted by Russian cosmonaut Alexei Leonov in March of 1965.
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```