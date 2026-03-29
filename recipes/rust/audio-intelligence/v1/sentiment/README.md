# Audio Intelligence: Sentiment Analysis

This example shows how to use Deepgram's AI sentiment analysis feature to detect emotional tone and sentiment throughout audio content. The sentiment analysis provides insights into whether speech contains positive, negative, or neutral emotions at different points in the conversation.

## What does it do?

Audio Intelligence Sentiment Analysis processes the transcript and provides:
- Emotional tone detection (positive, negative, neutral)
- Confidence scores for sentiment predictions
- Segment-level sentiment analysis for detailed insights
- Real-time understanding of emotional context in conversations

## Key parameters

- `sentiment: true` - Enables AI-powered sentiment analysis
- `paragraphs: true` - Provides better segmentation for sentiment analysis
- `model: "nova-3"` - Recommended model for accurate sentiment detection
- Works well with other intelligence features like summarization

## Example output

With sentiment analysis enabled, you'll see the transcript plus detailed sentiment for each segment:

```
Transcript: [Full transcript text...]

Sentiment Analysis:
Paragraph 1: {
  "sentiment": "positive",
  "sentiment_score": 0.8734
}
Paragraph 2: {
  "sentiment": "neutral", 
  "sentiment_score": 0.1245
}
```

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Audio should contain speech with detectable emotional context

## Run the example

```bash
cargo run
```