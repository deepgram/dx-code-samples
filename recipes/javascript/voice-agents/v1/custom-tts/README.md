# Configure TTS Voice (Voice Agents v1)

Choose a specific aura-2 voice model for the agent's speech output.

## What it does

Configures the voice agent to use a specific TTS voice for synthesizing speech. Deepgram offers multiple aura-2 voices with different characteristics. External TTS providers like ElevenLabs and Cartesia are also supported.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `speak.provider.type` | `"deepgram"` | TTS provider (deepgram, eleven_labs, cartesia) |
| `speak.provider.model` | `"aura-2-arcas-en"` | Voice model name |

## Example output

```
Settings applied with custom TTS voice
Agent: Hello! How can I help you today?
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```