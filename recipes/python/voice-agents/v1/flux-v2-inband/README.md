# Flux V2 In-Band Reconfiguration (Voice Agents v1)

Reconfigure a voice agent's STT keyterms, language hints, and TTS speed mid-session without dropping the WebSocket connection, using Deepgram's Flux v2 in-band update messages.

## What it does

Flux v2 supports in-band reconfiguration — you can change the listen and speak pipelines while a conversation is active. This recipe:

1. Opens a voice agent session with Flux v2 (`flux-general-multi`) and initial keyterms `["Deepgram", "Nova"]`
2. Sends an `UpdateListen` message to swap keyterms to `["Kubernetes", "gRPC"]` and add a Spanish language hint — all without reconnecting
3. Sends an `UpdateSpeak` message to adjust TTS speech speed to 0.9x
4. Injects a user message and prints the agent's response to confirm the session is still active after reconfiguration

This pattern is essential for production voice agents that need to adapt to caller context — for example, switching language when a caller switches to Spanish, or boosting domain-specific terminology when the conversation topic changes.

## Key parameters

| Message | Parameter | Value | Description |
|---------|-----------|-------|-------------|
| `AgentV1Settings` | `listen.provider.model` | `"flux-general-multi"` | Flux v2 multi-language STT model |
| `AgentV1Settings` | `listen.provider.keyterms` | `["Deepgram", "Nova"]` | Initial keyterms for recognition boosting |
| `AgentV1UpdateListen` | `listen.provider.keyterms` | `["Kubernetes", "gRPC"]` | Updated keyterms sent mid-session |
| `AgentV1UpdateListen` | `listen.provider.language_hints` | `["es"]` | Language hint switched to Spanish |
| `AgentV1UpdateSpeak` | `speak.provider.speed` | `0.9` | TTS speech speed (slower for clarity) |

## Example output

```
Session ready — Flux v2 listen with keyterms [Deepgram, Nova]
Updated listen: keyterms->[Kubernetes, gRPC], language->es
In-band update confirmed: ListenUpdated
Updated speak: speed->0.9
In-band update confirmed: SpeakUpdated
[assistant] Kubernetes is an open-source container orchestration platform...
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
