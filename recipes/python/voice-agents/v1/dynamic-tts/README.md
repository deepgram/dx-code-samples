# Dynamic TTS Expressivity (Voice Agents v1)

Change the voice agent's tone, pace, and personality mid-conversation by switching TTS voice models, speed, and system prompts on the fly.

## What it does

Defines three expressivity profiles — **empathetic**, **neutral**, and **enthusiastic** — each with a distinct aura-2 voice model, speaking speed, and system prompt. During a live voice agent session, `send_update_speak()` swaps the TTS configuration and `send_update_prompt()` adjusts the agent's behavior so that tone, pace, and personality all shift together. In production you would trigger these switches based on detected sentiment, conversation state, or business logic.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `send_update_speak()` | `AgentV1UpdateSpeak` | Swap the TTS model and speed mid-conversation |
| `send_update_prompt()` | `AgentV1UpdatePrompt` | Change the agent's system prompt mid-conversation |
| `SpeakSettingsV1Provider_Deepgram.model` | `str` | Aura-2 voice model (e.g., `aura-2-luna-en`) |
| `SpeakSettingsV1Provider_Deepgram.speed` | `float` | Speaking rate multiplier (0.9 = slower, 1.1 = faster) |

## Expressivity profiles

| Profile | Voice Model | Speed | Behavior |
|---------|------------|-------|----------|
| Empathetic | `aura-2-luna-en` | 0.9 | Gentle, compassionate — acknowledges feelings |
| Neutral | `aura-2-thalia-en` | 1.0 | Clear, factual — informational responses |
| Enthusiastic | `aura-2-asteria-en` | 1.1 | Upbeat, energetic — celebrates success |

## Example output

```
Agent configured with 3 expressivity profiles: empathetic, neutral, enthusiastic
Switched to 'empathetic' profile — voice=aura-2-luna-en, speed=0.9
Switched to 'enthusiastic' profile — voice=aura-2-asteria-en, speed=1.1
Switched to 'neutral' profile — voice=aura-2-thalia-en, speed=1.0
Connection opened
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
