# Function Calling (Voice Agents v1)

Inject tool calls for the LLM to use during a voice agent conversation.

## What it does

Configures the voice agent with function calling capabilities. The LLM can request tool/function calls during conversation when it needs external data or actions. This recipe demonstrates the message injection pattern used to simulate function-calling interactions.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `think.provider.type` | `"open_ai"` | LLM provider that supports function calling |
| `think.provider.model` | `"gpt-4o-mini"` | Model with function calling support |

## Example output

```
Settings applied with function calling
User: What is the weather like today?
Agent: I'd be happy to help with the weather! However, I don't have access to real-time weather data.
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```