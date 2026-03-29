# Voice Agents: Function Calling

This example shows how to configure a voice agent with function calling capabilities. Function calling allows the agent to execute external tools and APIs based on user requests, making it interactive and capable of performing actions beyond simple conversation.

## What does it do?

Function Calling Configuration demonstrates:
- Defining custom functions that the agent can execute
- Providing function descriptions and parameter schemas
- Enabling the agent to understand when and how to call functions
- Creating interactive agents that can perform real-world tasks

## Key parameters

- **Functions array**: List of available functions with names, descriptions, and parameters
- **Function schema**: JSON Schema defining required and optional parameters
- **LLM instructions**: System prompts that explain when to use each function
- **Parameter validation**: Automatic parameter extraction from user speech

## Example output

When successfully configured, you'll see:

```
Connected to Deepgram Voice Agents
Sent function calling configuration:
  Available functions:
    - get_weather(location): Get weather information
    - set_reminder(message, time): Set reminders
  Agent can now execute functions based on user requests
Received: {"type":"Welcome","id":"agent_abc123","..."}
Voice agent with function calling configured successfully!
```

The agent can now respond to requests like "What's the weather in New York?" or "Remind me to call mom at 3pm."

## Use cases

- **Smart assistants**: Weather, calendar, reminders, and information lookup
- **Customer service**: Order tracking, account management, booking systems
- **IoT control**: Smart home devices, lighting, temperature control
- **Business automation**: CRM updates, scheduling, data entry
- **E-commerce**: Product search, price checking, order management

## Function execution flow

1. User speaks a request that requires a function
2. Agent identifies the intent and extracts parameters
3. Agent calls the appropriate function with extracted parameters
4. Your application handles the function execution
5. Agent receives the result and responds naturally to the user

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Plan your function schemas carefully for reliable parameter extraction
- Implement function handlers in your application to process the calls

## Run the example

```bash
cargo run
```

Note: This example configures the functions but doesn't implement handlers. In a real application, you would listen for function call messages and execute the requested functions.