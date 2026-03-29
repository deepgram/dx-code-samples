# Voice Agents: Custom LLM Configuration

This example shows how to configure a voice agent with a custom LLM provider and model for the "thinking" component. You can customize the AI reasoning engine that processes user input and generates responses while keeping Deepgram's high-quality speech processing for listening and speaking.

## What does it do?

Custom LLM Configuration demonstrates:
- Configuring alternative LLM providers (OpenAI, Anthropic, etc.)
- Selecting specific models for different capabilities and performance
- Customizing system instructions for domain-specific expertise
- Maintaining speech quality while personalizing AI reasoning

## Key parameters

- **Provider type**: `"anthropic"`, `"open_ai"`, or other supported providers
- **Model selection**: Specific model names like `"claude-3-5-sonnet"`, `"gpt-4o"`, etc.
- **Custom instructions**: Tailored system prompts for specialized behavior
- **Audio settings**: Remain consistent regardless of LLM choice

## Example output

When successfully configured, you'll see:

```
Connected to Deepgram Voice Agents
Sent custom LLM configuration:
  Provider: Anthropic
  Model: Claude 3.5 Sonnet
  Instructions: Space technology expert
Received: {"type":"Welcome","id":"agent_abc123","..."}
Voice agent with custom LLM configured successfully!
```

The agent will now use Claude for reasoning while maintaining Deepgram's speech processing.

## Use cases

- **Domain expertise**: Configure specialized instructions for medical, legal, technical, or educational contexts
- **Model optimization**: Choose faster models for real-time needs or more capable models for complex reasoning
- **Cost management**: Balance performance and pricing across different LLM providers
- **Compliance requirements**: Use specific providers that meet your organization's data handling needs

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Ensure your account has access to alternative LLM providers if not using OpenAI
- Consider API costs for your chosen LLM provider

## Run the example

```bash
cargo run
```