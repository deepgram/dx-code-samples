# Dynamic Tool Availability (Voice Agents v1)

Control which tools the LLM can call on each conversation turn, enabling phased workflows where tool access is granted or revoked as the conversation progresses.

## What it does

Starts a voice agent session with a single tool (`verify_identity`). Once the user's identity is verified via a function call, the agent dynamically swaps in a new tool set (`get_balance`, `transfer_funds`) by calling `send_update_think()` on the live WebSocket — no reconnection needed. The system prompt is updated in tandem so the LLM knows which tools are now available.

This pattern is essential for production agents with multi-phase conversations: a banking agent should only expose transfer tools after identity verification, a support agent should restrict escalation tools until troubleshooting is exhausted, and so on.

## Key parameters

| Parameter | Description |
|-----------|-------------|
| `think.functions` | List of tool/function definitions the LLM may call |
| `send_update_think(AgentV1UpdateThink)` | Replace the think config (including functions) mid-session |
| `send_update_prompt(AgentV1UpdatePrompt)` | Update the system prompt to reflect new tool availability |
| `AgentV1FunctionCallRequest` | Event fired when the LLM invokes a tool |
| `send_function_call_response()` | Return the tool result to the agent |

## Conversation phases

| Phase | Available tools | Trigger to advance |
|-------|-----------------|--------------------|
| 1 — Greeting | `verify_identity` | User provides verification code |
| 2 — Authorized | `get_balance`, `transfer_funds` | (end of demo) |

## Example output

```
Connection opened
[Phase 1] Tools: verify_identity
[user] Hi, my code is ABC123
[Phase 1] Tool called: verify_identity
[Phase 2] Tools updated → get_balance, transfer_funds
[assistant] Your identity has been verified. How can I help you today?
[user] What is my balance?
[Phase 2] Tool called: get_balance
[assistant] Your current balance is $4,210.50.
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
