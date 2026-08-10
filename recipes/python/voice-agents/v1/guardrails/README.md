# Voice Agent Guardrails (Voice Agents v1)

Production-grade safety boundaries for voice agents: tool-call iteration limits, topic enforcement, and response-length validation.

## What it does

Configures a Deepgram voice agent with three guardrail patterns that prevent uncontrolled agent behavior in production:

1. **Iteration limits** — Caps the number of tool-calling rounds per session. When the agent exceeds `MAX_ITERS` function calls, subsequent calls receive an error response instead of executing, preventing runaway tool-calling loops that waste resources and leave users waiting.

2. **Topic enforcement** — Uses the system prompt to restrict the agent to an allowlist of topics (`weather`, `time`, `greetings`). The LLM is instructed to politely decline and redirect any off-topic requests, keeping conversations within supported domains.

3. **Response validation** — Monitors `ConversationText` events and flags assistant responses that exceed `MAX_LEN` characters. This catches unexpectedly verbose responses before they consume TTS resources.

All three guardrails are configured through constants at the top of the file, making thresholds easy to adjust for different deployment scenarios.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `MAX_ITERS` | `3` | Maximum tool-calling rounds before blocking |
| `TOPICS` | `["weather", "time", "greetings"]` | Allowed conversation topics |
| `MAX_LEN` | `500` | Maximum assistant response length (chars) |
| `think.prompt` | topic-restricted | System prompt enforcing topic boundaries |
| `think.functions` | `[get_weather]` | Tool definition for demonstrating iteration limits |

## Example output

```
Connection opened
Event: SettingsApplied
Guardrails active — max_iters=3, topics=['weather', 'time', 'greetings'], max_len=500
[user] What is the weather in Paris?
Tool #1: get_weather
[assistant] The weather in Paris is currently 72°F and sunny.
```

When the iteration limit is reached:
```
Tool #3: get_weather
GUARDRAIL BLOCKED: get_weather
```

When a response exceeds the length limit:
```
GUARDRAIL: response too long (612/500 chars)
[assistant] ...
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
