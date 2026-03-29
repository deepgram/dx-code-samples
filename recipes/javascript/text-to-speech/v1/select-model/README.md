# Select Voice Model (Text-to-Speech v1)

Choose from available aura-2 voice models for speech synthesis.

## What it does

Deepgram offers multiple aura-2 voice models, each with different voice characteristics. This recipe demonstrates selecting a specific voice model. Available voices include thalia, arcas, luna, orion, perseus, and more.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"aura-2-arcas-en"` | Voice model — format: aura-2-{voice}-{language} |
| `encoding` | `"linear16"` | Audio encoding |
| `container` | `"wav"` | Audio container format |

## Example output

```
Generated audio with aura-2-arcas-en: 142080 bytes
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```