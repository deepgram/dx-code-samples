# Voice Agents: Basic Connection

This example shows how to establish a WebSocket connection to Deepgram's Voice Agents API. Voice agents provide real-time conversational AI that can listen to speech, understand context, think through responses, and speak back with natural-sounding voice synthesis.

## What does it do?

Voice Agents Basic Connection demonstrates:
- WebSocket connection establishment to the voice agents endpoint
- Authentication using your Deepgram API key
- Sending agent configuration settings
- Receiving confirmation of successful connection setup
- Basic agent configuration with speech-to-text, LLM, and text-to-speech models

## Key parameters

- **WebSocket URL**: `wss://agent.deepgram.com/agent` - The voice agents endpoint
- **Authentication**: Uses your `DEEPGRAM_API_KEY` in the connection URL
- **Settings message**: Configures the agent's listening, thinking, and speaking capabilities
- **Audio format**: Linear16 PCM at 16kHz sample rate for real-time processing

## Example output

When successfully connected, you'll see:

```
Connected to Deepgram Voice Agents
Sent agent configuration
Received: {"type":"Welcome","id":"agent_abc123","..."}
Voice agent connection established successfully!
```

The Welcome message confirms that your agent is ready to handle real-time conversations.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Stable internet connection for WebSocket communication
- For full conversations, you'll need microphone input and audio output capabilities

## Run the example

```bash
cargo run
```

Note: This example establishes the connection and verifies setup. For actual conversations, you would send audio data and receive both transcripts and synthesized speech responses.