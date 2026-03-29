# Keyword Boosting (Speech-to-Text v1)

Boost accuracy for specific keywords or proper nouns.

## What it does

When enabled, Deepgram gives higher recognition priority to the specified terms. This improves accuracy for domain-specific vocabulary, proper nouns, and technical jargon that might otherwise be misrecognized. Each keyword can have an optional boost value.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `keywords` | `["spacewalk:2", "Leonov:1.5"]` | Terms to boost with optional weight |
| `model` | `"nova-3"` | Transcription model |

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