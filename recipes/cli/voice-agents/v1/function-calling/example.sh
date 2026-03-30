#!/usr/bin/env bash
# Recipe: Function Calling (Voice Agents v1)
#
# Demonstrates injecting tool/function definitions for the LLM to use
# during a voice agent conversation. The agent can call these functions
# when the user asks relevant questions.

CONFIG='{
  "type": "SettingsConfiguration",
  "audio": {"input": {"encoding": "linear16", "sample_rate": 16000}, "output": {"encoding": "linear16", "sample_rate": 16000}},
  "agent": {
    "listen": {"model": "nova-3"},
    "think": {
      "provider": {"type": "open_ai"},
      "model": "gpt-4o-mini",
      "functions": [
        {
          "name": "get_weather",
          "description": "Get current weather for a location",
          "parameters": {"type": "object", "properties": {"location": {"type": "string", "description": "City name"}}, "required": ["location"]}
        }
      ]
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

echo "Voice agent with function calling initiated successfully"
