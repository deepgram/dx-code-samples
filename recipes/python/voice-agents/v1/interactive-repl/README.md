# Interactive Voice Agent REPL (Voice Agents v1)

Run a multi-turn conversation with a Deepgram voice agent from the command line, with speaker-labelled transcript output.

## What it does

Opens a WebSocket session to Deepgram's Agent API, configures the listen-think-speak pipeline, and runs a conversation loop that sends user messages and prints agent responses with speaker labels (`[You]` / `[Agent]`). This is the foundational pattern for building an interactive CLI REPL — extend it with microphone input (via `pyaudio` or `sounddevice`) and speaker output to create a full voice-driven terminal experience.

The example uses `inject_user_message` to send text prompts, making it fully runnable in any environment (no microphone required). Each response is captured with its role label, building a conversation transcript that is summarized at session end.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `listen.provider.model` | `"nova-3"` | STT model for the listen stage |
| `think.provider.model` | `"gpt-4o-mini"` | LLM model for the think stage |
| `think.prompt` | `"You are a helpful assistant..."` | System prompt controlling agent persona |
| `speak.provider.model` | `"aura-2-thalia-en"` | TTS voice model for agent speech |
| `inject_user_message` | text string | Sends a text message as if the user spoke it |

## Example output

```
[You] What is a spacewalk?
[Agent] A spacewalk is when an astronaut exits a spacecraft to perform tasks in the vacuum of space.
[You] How long does one typically last?
[Agent] A typical spacewalk lasts about six to seven hours.

Session complete — 4 messages exchanged
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
pytest example_test.py -v --timeout=120
```

## Extending to full voice REPL

To add real microphone input and speaker playback:

1. Capture microphone audio with `sounddevice` or `pyaudio` and call `agent.send_audio(chunk)` in a loop
2. Collect audio bytes from the `on_message` callback (when `isinstance(message, bytes)`) and write them to a `sounddevice` output stream
3. Replace the `PROMPTS` list with `input()` calls or a readline-based REPL loop
