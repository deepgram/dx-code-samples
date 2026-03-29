# Voice Agents: Custom Text-to-Speech Voice

This example shows how to configure a voice agent with a custom TTS voice model for the "speaking" component. You can customize the voice characteristics, gender, language, and speaking style to match your application's needs and brand identity.

## What does it do?

Custom TTS Voice Configuration demonstrates:
- Selecting different voice models with unique characteristics
- Choosing between male and female voices
- Matching voice personality to your application context
- Maintaining consistent audio quality across different voice options

## Key parameters

- **Voice model**: Specific Aura voice models with different characteristics:
  - `aura-2-thalia-en`: Warm, friendly female voice
  - `aura-2-zeus-en`: Professional, authoritative male voice  
  - `aura-2-hera-en`: Conversational, approachable female voice
  - `aura-2-apollo-en`: Clear, articulate male voice
- **Language support**: All voices support English with natural pronunciation
- **Audio format**: Consistent linear16 PCM output regardless of voice choice

## Example output

When successfully configured, you'll see:

```
Connected to Deepgram Voice Agents
Sent custom TTS voice configuration:
  Voice model: Aura Zeus (professional male voice)
  Language: English
  Tone: Professional and authoritative
Received: {"type":"Welcome","id":"agent_abc123","..."}
Voice agent with custom TTS voice configured successfully!
```

The agent will now speak with the selected voice characteristics.

## Use cases

- **Brand consistency**: Match your agent's voice to your brand personality
- **Demographic targeting**: Choose voices that resonate with your audience
- **Application context**: Professional voices for business, friendly voices for customer service
- **Accessibility**: Provide voice options that users find comfortable and clear

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Consider your target audience when selecting voice characteristics
- Test different voices with your specific use case content

## Run the example

```bash
cargo run
```