# Topic Detection

This recipe demonstrates automatic topic detection, which identifies key topics and themes discussed in the audio content. Topic detection analyzes the content semantically to extract main subjects, concepts, and discussion points from the conversation.

## What it does

Topic detection examines the transcript and identifies the primary subjects being discussed, providing structured topic information with relevance scores. This helps categorize and understand the content themes without manually analyzing the full transcript.

## Key Parameters

- `topics(true)`: Enables automatic topic detection and classification
- `smart_format(true)`: Optional formatting improvements  
- `model()`: Optional model selection for better accuracy

## Expected Output

With topic detection enabled, you'll see output like:
```
Full Response:
{
  "topics": [
    {
      "topic": "space exploration",
      "confidence": 0.95
    },
    {
      "topic": "NASA",
      "confidence": 0.87
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

- Topic detection works best with longer audio content discussing specific subjects
- Topics appear in `response.results.topics` with confidence scores
- May not detect topics in very short or general conversation
- Useful for content categorization, meeting analysis, and automated tagging
- Best results with clear, structured discussions about specific themes