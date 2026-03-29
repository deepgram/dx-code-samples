# Audio Intelligence: Topic Detection

This example shows how to use Deepgram's AI topic detection feature to automatically identify and classify topics discussed in audio content. Topic detection helps categorize conversations and understand what subjects are being covered throughout the recording.

## What does it do?

Audio Intelligence Topic Detection analyzes the transcript and provides:
- Automatic identification of discussion topics
- Confidence scores for each detected topic
- Segment-level topic classification for detailed insights
- Understanding of subject matter and conversation themes

## Key parameters

- `topics: true` - Enables AI-powered topic detection and classification
- `model: "nova-3"` - Recommended model for accurate topic identification
- Can be combined with other intelligence features like sentiment and summarization

## Example output

With topic detection enabled, you'll see the transcript plus identified topics for each segment:

```
Transcript: [Full transcript text...]

Detected Topics:
Segment 1: [
  {
    "topic": "Technology",
    "confidence_score": 0.8934
  },
  {
    "topic": "Space Exploration", 
    "confidence_score": 0.7542
  }
]
```

Note: Topic detection works best with longer audio content containing clear subject matter and discussion points.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Audio should contain substantive discussion of identifiable topics

## Run the example

```bash
cargo run
```