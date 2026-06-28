# Escalation Handoff (Voice Agents v1)

Detect when a voice agent conversation needs human intervention and perform a warm handoff with a structured context packet.

## What it does

Configures a Deepgram Voice Agent with an `escalate_to_human` function that the LLM calls when it detects the conversation should be transferred to a human agent. Escalation triggers include: the user explicitly asking for a human, repeated inability to resolve an issue, or negative caller sentiment. When triggered, the agent outputs a structured JSON context packet containing the reason for escalation, a conversation summary, and sentiment — suitable for routing to a CRM or ticketing system. The agent then delivers a handoff message to the caller.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `think.functions` | `[escalate_to_human]` | Function definition the LLM invokes to escalate |
| `FunctionCallRequest.input` | `dict` | Contains `reason`, `summary`, and `sentiment` from the LLM |
| `send_function_call_response()` | method | Acknowledge the function call so the LLM continues |
| `send_inject_agent_message()` | method | Deliver a handoff message to the caller |

## Escalation triggers

The LLM is prompted to call `escalate_to_human` when any of these occur:

1. **Explicit request** — the caller says "let me speak to a human" or similar
2. **Repeated failure** — the agent cannot resolve the issue after multiple attempts
3. **Negative sentiment** — the caller expresses frustration or dissatisfaction

## Example output

```
Agent configured with escalation handoff
Connection opened
Event: SettingsApplied
ESCALATION CONTEXT PACKET:
{
  "escalation": true,
  "call_id": "fc-abc123",
  "reason": "User explicitly requested a human agent",
  "summary": "Caller asked about billing discrepancy, AI could not access account details",
  "sentiment": "negative"
}
Event: ConversationText
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
