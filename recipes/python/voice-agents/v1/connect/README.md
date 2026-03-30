# Connect to Voice Agent (Voice Agents v1)

Establish a WebSocket voice agent session with default listen-think-speak pipeline settings.

## What it does

Opens a WebSocket connection to Deepgram's Agent API and configures a voice agent with three stages: listen (speech-to-text using nova-3), think (LLM using GPT-4o-mini), and speak (text-to-speech using aura-2). Once configured, the agent can process audio input and generate spoken responses in real time.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `listen.provider.model` | `"nova-3"` | STT model for the listen stage |
| `think.provider.model` | `"gpt-4o-mini"` | LLM model for the think stage |
| `speak.provider.model` | `"aura-2-thalia-en"` | TTS model for the speak stage |
| `audio.input.encoding` | `"linear16"` | Input audio encoding |
| `audio.input.sample_rate` | `24000` | Input audio sample rate |

## Example output

```
Voice agent session configured
Connection opened
Event: SettingsApplied
Connection closed
```

## Prerequisites

- Python 3.10+
- Set `DEEPGRAM_API_KEY` environment variable
- Install: `pip install -r recipes/python/requirements.txt`

## Run

```bash
python example.py
```

## Test

```bash
pytest example_test.py -v
```
