#!/usr/bin/env bash
# Recipe: Function Calling (Voice Agents v1)
#
# Demonstrates injecting tool/function definitions for the LLM
# to use during a voice agent conversation. Prints the configuration
# payload with a sample function definition.

SETTINGS=$(cat << 'JSON'
{
  "type": "SettingsConfiguration",
  "audio": {
    "input": { "encoding": "linear16", "sample_rate": 16000 },
    "output": { "encoding": "linear16", "sample_rate": 16000, "container": "none" }
  },
  "agent": {
    "listen": { "model": "nova-3" },
    "think": {
      "provider": { "type": "open_ai" },
      "model": "gpt-4o-mini",
      "instructions": "You are a helpful assistant. Use the get_weather function when asked about weather.",
      "functions": [
        {
          "name": "get_weather",
          "description": "Get the current weather for a location",
          "parameters": {
            "type": "object",
            "properties": {
              "location": { "type": "string", "description": "City name" }
            },
            "required": ["location"]
          }
        }
      ]
    },
    "speak": { "model": "aura-2-thalia-en" }
  }
}
JSON
)

echo "$SETTINGS" | python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin), indent=2))"
echo ""
echo "Voice agent configured with function calling (get_weather)."
