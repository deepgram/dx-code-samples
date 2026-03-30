# Function Calling (Voice Agents v1)

Inject tool calls for the LLM to use during a voice agent conversation.

## What it does

Demonstrates adding function/tool definitions to the voice agent's "think" configuration. When the user asks a relevant question during conversation, the LLM can invoke these functions to fetch external data (weather, database lookups, etc.) and include the results in its response.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `think.functions[].name` | `get_weather` | Function name the LLM can call |
| `think.functions[].parameters` | `{...}` | JSON Schema for function arguments |

## Example output

```
Welcome: {"type": "Welcome", ...}
Voice agent with function calling initiated successfully
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
