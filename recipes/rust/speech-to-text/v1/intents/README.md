# Intent Recognition

This recipe demonstrates automatic intent recognition, which identifies the purpose, goals, or intentions behind spoken words. Intent recognition goes beyond transcription to understand what the speaker is trying to accomplish or communicate.

## What it does

Intent recognition analyzes the transcript to identify the underlying purpose of the speech, such as requesting information, expressing opinions, giving instructions, or asking questions. This helps understand the speaker's goals and enables better response automation.

## Key Parameters

- `intents(true)`: Enables automatic intent detection and classification
- `smart_format(true)`: Optional formatting improvements
- `model()`: Optional model selection for better accuracy

## Expected Output

With intent recognition enabled, you'll see output like:
```
Full Response:
{
  "intents": [
    {
      "intent": "informational",
      "confidence": 0.89
    },
    {
      "intent": "declarative",
      "confidence": 0.76
    }
  ],
  "channels": [...],
  ...
}

Transcript: So that was a big step for NASA.
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable

## Run

```bash
cargo run
```

## Notes

- Intent recognition works best with conversational audio containing clear purposes
- Intents appear in `response.results.intents` with confidence scores
- Common intent types include questions, requests, commands, statements, etc.
- May not detect clear intents in very descriptive or narrative speech
- Useful for chatbots, voice assistants, and automated customer service systems