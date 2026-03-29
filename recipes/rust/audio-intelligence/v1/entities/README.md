# Audio Intelligence: Entity Detection

This example shows how to use Deepgram's AI entity detection feature to automatically identify and extract named entities from audio content. Entity detection helps identify people, places, organizations, dates, and other important information mentioned in speech.

## What does it do?

Audio Intelligence Entity Detection analyzes the transcript and provides:
- Automatic identification of named entities (people, places, organizations)
- Detection of dates, times, numbers, and other structured information
- Confidence scores and position information for each entity
- Classification of entity types for better understanding

## Key parameters

- `detect_entities: true` - Enables AI-powered entity detection and extraction
- `model: "nova-3"` - Recommended model for accurate entity recognition
- Useful for content analysis, meeting notes, and information extraction

## Example output

With entity detection enabled, you'll see the transcript plus identified entities:

```
Transcript: [Full transcript text...]

Detected Entities:
{
  "label": "PERSON",
  "value": "John Smith",
  "confidence": 0.8945,
  "start_word": 12,
  "end_word": 13
}
{
  "label": "ORG", 
  "value": "NASA",
  "confidence": 0.9234,
  "start_word": 25,
  "end_word": 25
}
```

Note: Entity detection works best with audio containing proper nouns, names, organizations, and other identifiable entities.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Audio should contain speech with identifiable named entities

## Run the example

```bash
cargo run
```