# Audio Intelligence: Intent Recognition

This example shows how to use Deepgram's AI intent recognition feature to automatically detect user intents and purposes within audio content. Intent recognition helps understand what actions or outcomes the speaker is trying to achieve through their speech.

## What does it do?

Audio Intelligence Intent Recognition analyzes the transcript and provides:
- Automatic detection of user intents and goals
- Classification of speaker purposes and desired outcomes
- Confidence scores for each identified intent
- Understanding of actionable requests within conversations

## Key parameters

- `intents: true` - Enables AI-powered intent recognition and classification
- `model: "nova-3"` - Recommended model for accurate intent detection
- Works well with customer service, support, and conversational audio

## Example output

With intent recognition enabled, you'll see the transcript plus detected intents for each segment:

```
Transcript: [Full transcript text...]

Detected Intents:
Segment 1: [
  {
    "intent": "request_information",
    "confidence_score": 0.8456
  },
  {
    "intent": "schedule_appointment",
    "confidence_score": 0.7234
  }
]
```

Note: Intent recognition works best with conversational audio containing clear requests, questions, or actionable statements.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Audio should contain speech with identifiable intents or purposes

## Run the example

```bash
cargo run
```