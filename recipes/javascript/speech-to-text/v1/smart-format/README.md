# Smart Format (Speech-to-Text v1)

Automatically format transcript output with proper numbers, dates, currencies, and addresses.

## What it does

When enabled, Smart Format applies intelligent formatting to the raw transcript. Numbers are written as digits, currencies get symbols, dates are formatted consistently, and addresses are properly structured. It is a superset of the `punctuate` and `numerals` features.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `smart_format` | `true` | Enable automatic formatting of numbers, dates, currencies, addresses |
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