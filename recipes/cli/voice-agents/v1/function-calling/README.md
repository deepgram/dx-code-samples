# Function Calling (Voice Agents v1)

Inject tool calls for the LLM to use during a voice agent conversation.

## What it does

Function calling allows the voice agent's LLM to invoke external tools during a conversation. Functions are defined in the `think.functions` array with a name, description, and JSON Schema parameters. When the LLM determines a function should be called, it sends a function call event over the WebSocket for your application to handle.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `think.functions` | array | List of function definitions |
| `functions[].name` | string | Function name |
| `functions[].description` | string | What the function does |
| `functions[].parameters` | JSON Schema | Expected input parameters |

## Example output

```json
{
  "type": "SettingsConfiguration",
  "agent": {
    "think": {
      "functions": [
        { "name": "get_weather", "description": "Get the current weather for a location", ... }
      ]
    }
  }
}

Voice agent configured with function calling (get_weather).
```

## Prerequisites

- Deepgram CLI installed (`curl -fsSL https://deepgram.com/install.sh | sh`)
- `DEEPGRAM_API_KEY` environment variable set
- `python3` installed

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```
