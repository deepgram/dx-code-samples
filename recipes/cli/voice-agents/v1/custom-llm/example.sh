#!/usr/bin/env bash
# Recipe: Configure LLM Provider (Voice Agents v1)
#
# Demonstrates configuring a custom LLM provider for the voice agent's
# "think" step. This example uses OpenAI's gpt-4o-mini model, but you
# can swap to Anthropic or other supported providers.

CONFIG='{
  "type": "SettingsConfiguration",
  "audio": {"input": {"encoding": "linear16", "sample_rate": 16000}, "output": {"encoding": "linear16", "sample_rate": 16000}},
  "agent": {
    "listen": {"model": "nova-3"},
    "think": {
      "provider": {"type": "open_ai"},
      "model": "gpt-4o-mini",
      "instructions": "You are a helpful assistant. Keep responses brief."
    },
    "speak": {"model": "aura-2-thalia-en"}
  }
}'

echo "$CONFIG" \
  | websocat -n1 \
    "wss://agent.deepgram.com/agent" \
    --header "Authorization: Token $DEEPGRAM_API_KEY" \
  | python3 -c "
import sys, json
for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    try:
        msg = json.loads(line)
        print(f'{msg[\"type\"]}: {json.dumps(msg, indent=2)[:200]}')
    except (json.JSONDecodeError, KeyError):
        pass
" | head -5

echo "Voice agent with custom LLM initiated successfully"
