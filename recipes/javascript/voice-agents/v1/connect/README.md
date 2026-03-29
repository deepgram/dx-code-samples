# Connect to Voice Agent (Voice Agents v1)

Establish a WebSocket voice agent session with default settings.

## What it does

Connects to Deepgram's voice agent API via WebSocket and configures a listen-think-speak pipeline. The agent transcribes user speech, generates a response using an LLM, and synthesizes the reply as audio. This recipe sends pre-recorded audio to simulate a user interaction.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `listen.provider` | `deepgram/nova-3` | Speech recognition model |
| `think.provider` | `open_ai/gpt-4o-mini` | LLM for conversation logic |
| `speak.provider` | `deepgram/aura-2-thalia-en` | TTS voice model |
| `greeting` | `"Hello!..."` | Agent's initial greeting |

## Example output

```
Settings applied
Agent started speaking
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