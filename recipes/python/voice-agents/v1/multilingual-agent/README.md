# Multilingual Voice Agent (Voice Agents v1)

Build a voice agent that automatically detects the speaker's language and dynamically switches its TTS voice and system prompt to match — no upfront language selection required.

## What it does

This recipe configures a Deepgram Voice Agent with Nova-3's multilingual STT (`language=multi`) to transcribe speech in any supported language. A `switch_language` function is registered with the LLM so it can signal when the user's language changes. When triggered, the agent dynamically updates its TTS voice and system prompt using `send_update_speak` and `send_update_prompt`, enabling seamless mid-conversation language switching across English, Spanish, and French.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `listen.provider.model` | `"nova-3"` | STT model with multilingual support |
| `listen.provider.language` | `"multi"` | Enables automatic language detection |
| `think.provider.model` | `"gpt-4o-mini"` | LLM for the think stage |
| `think.functions` | `[switch_language]` | Function the LLM calls on language change |
| `speak.provider.model` | `"aura-2-thalia-en"` | Initial TTS voice (English) |

## Language configuration

| Language | TTS Voice | Prompt Language |
|----------|-----------|-----------------|
| English (`en`) | `aura-2-thalia-en` | Reply in English |
| Spanish (`es`) | `aura-2-thalia-es` | Responde en español |
| French (`fr`) | `aura-2-thalia-fr` | Répondez en français |

## How language switching works

1. Nova-3 with `language=multi` transcribes speech regardless of language
2. The LLM detects the user's language from the transcript text
3. When the language changes, the LLM calls the `switch_language` function
4. The handler updates the TTS voice and system prompt for the new language
5. The agent continues the conversation in the detected language

## Example output

```
Multilingual agent configured (en/es/fr)
Connection opened
Event: SettingsApplied
Switched to es: voice=aura-2-thalia-es
Received 4800 bytes of agent audio
Switched to fr: voice=aura-2-thalia-fr
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
