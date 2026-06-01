# Proactive Speech During Silence (Voice Agents v1)

Fill conversational pauses with context-aware agent prompts instead of leaving the user in awkward silence.

## What it does

In a real conversation, silence feels unnatural — the other party would offer a helpful nudge ("Would you like me to repeat that?", "Take your time"). This recipe uses `send_inject_agent_message` to queue proactive prompts that the agent speaks when the user is silent. The `behavior="queue"` option ensures prompts are appended after any in-progress speech and never interrupt the user.

Three escalating prompt strategies are demonstrated:

1. **Gentle patience** — reassures the user there is no rush
2. **Offer clarification** — asks if the user needs something repeated
3. **Suggest alternatives** — offers to help with a different question

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `AgentV1InjectAgentMessage.message` | `str` | The text the agent should speak |
| `AgentV1InjectAgentMessage.behavior` | `"queue"` | Append after current speech; never interrupt |
| `listen.provider.model` | `"nova-3"` | STT model for the listen stage |
| `think.provider.model` | `"gpt-4o-mini"` | LLM model for the think stage |
| `speak.provider.model` | `"aura-2-thalia-en"` | TTS model for the speak stage |

### Behavior modes

| Mode | Effect |
|------|--------|
| `"default"` | Speak only if no turn is in progress; otherwise returns `InjectionRefused` |
| `"queue"` | Append after any queued speech — plays immediately if nothing is queued |

## Example output

```
Connection opened
Event: Welcome
Event: SettingsApplied
Agent ready — injecting proactive prompts
Injected prompt 1/3: Take your time — I'm here whenever you're ready.
Injected prompt 2/3: Would you like me to repeat or clarify anything?
Injected prompt 3/3: I can also help with other questions if you'd like.
Event: AgentStartedSpeaking
Received 4800 bytes of agent audio
Event: ConversationText
Event: AgentAudioDone
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
