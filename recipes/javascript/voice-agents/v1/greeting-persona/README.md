# Greeting & Persona Configuration (Voice Agents v1)

Configure a voice agent with a custom greeting message and persona constraints so the agent introduces itself naturally and stays within defined behavioral boundaries.

## What it does

When a voice agent session opens, the `greeting` field makes the agent speak a specific welcome message immediately — no user input required. The `prompt` field in the `think` configuration defines the agent's persona: its name, role, tone, and topic boundaries. Together, these give you a production-ready agent that greets callers consistently and refuses off-topic requests gracefully.

This recipe configures an agent named "Sarah" who works as Acme Corp customer support. She introduces herself on connection and only answers questions about Acme products, orders, and accounts.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `agent.greeting` | `"Hi, I'm Sarah from Acme Support..."` | Message the agent speaks immediately on connection |
| `agent.think.prompt` | *(persona instructions)* | System prompt defining name, role, tone, and topic guardrails |
| `agent.think.provider` | `open_ai/gpt-4o-mini` | LLM that follows the persona instructions |
| `agent.speak.provider` | `deepgram/aura-2-thalia-en` | TTS voice for the agent |

## Persona prompt tips

- **Name and role** — state who the agent is so it can introduce itself when asked
- **Topic boundaries** — list what the agent should and should not discuss
- **Redirect phrase** — give the agent a scripted response for off-topic requests
- **Tone constraints** — specify formality, vocabulary limits, and response length

## Example output

```
Settings applied — persona active
Agent started speaking
Agent: Hi, I'm Sarah from Acme Support. How can I help you today?
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```
