# Entity Detection

This recipe demonstrates automatic entity detection, which identifies and classifies important entities in spoken content such as people, organizations, locations, dates, and other meaningful entities mentioned in the audio.

## What it does

Entity detection analyzes the transcript to identify and categorize named entities like persons, places, organizations, dates, times, monetary amounts, and other structured information. This helps extract key information and enables automated data processing.

## Key Parameters

- `detect_entities(true)`: Enables automatic entity detection and classification
- `smart_format(true)`: Optional formatting improvements
- `model()`: Optional model selection for better accuracy

## Expected Output

With entity detection enabled, you'll see output like:
```
Full Response:
{
  "entities": [
    {
      "text": "NASA",
      "type": "ORGANIZATION",
      "confidence": 0.94
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

- Entity detection works best with audio containing specific names, places, or organizations
- Entities appear in `response.results.entities` with type and confidence information
- Common entity types include PERSON, ORGANIZATION, LOCATION, DATE, TIME, MONEY
- May not detect entities in very general or abstract conversations
- Useful for contact extraction, content indexing, and automated information processing