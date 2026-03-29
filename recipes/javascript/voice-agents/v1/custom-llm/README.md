# Configure LLM Provider (Voice Agents v1)

Use a custom LLM provider for the voice agent's "think" step.

## What it does

Configures the voice agent to use a specific LLM provider for generating responses. Available providers include OpenAI, Anthropic, Google, Groq, and AWS Bedrock. External providers require API keys configured in the Deepgram dashboard.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `think.provider.type` | `"open_ai"` | LLM provider (open_ai, anthropic, google, groq) |
| `think.provider.model` | `"gpt-4o-mini"` | Model name for the selected provider |
| `think.prompt` | `"You are..."` | System prompt for the LLM |

## Example output

```
Settings applied with custom LLM
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