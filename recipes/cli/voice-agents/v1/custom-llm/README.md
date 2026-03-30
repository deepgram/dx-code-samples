# Configure LLM Provider (Voice Agents v1)

Use OpenAI or Anthropic as the think model for your voice agent.

## What it does

Demonstrates configuring a custom LLM provider in the voice agent's "think" step. The `think.provider` field selects the LLM backend (OpenAI, Anthropic, etc.) and `think.instructions` sets the system prompt that guides the agent's conversational behaviour.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `think.provider.type` | `open_ai` | LLM provider (open_ai, anthropic, etc.) |
| `think.model` | `gpt-4o-mini` | Specific model to use |
| `think.instructions` | `"You are..."` | System prompt for agent behaviour |

## Example output

```
Welcome: {"type": "Welcome", ...}
Voice agent with custom LLM initiated successfully
```

## Prerequisites

- `websocat` and `python3` installed
- Set `DEEPGRAM_API_KEY` environment variable

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```
