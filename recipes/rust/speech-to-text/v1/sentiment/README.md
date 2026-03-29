# Sentiment Analysis

This recipe demonstrates automatic sentiment analysis, which identifies the emotional tone and attitude in spoken words. Sentiment analysis determines whether the speaker's attitude is positive, negative, or neutral, providing insights into the emotional context of the conversation.

## What it does

Sentiment analysis examines the transcript and identifies the emotional tone at word, phrase, or overall content levels. It assigns sentiment scores (positive, negative, neutral) to help understand the speaker's emotional state and attitude throughout the audio.

## Key Parameters

- `sentiment(true)`: Enables automatic sentiment analysis and scoring
- `smart_format(true)`: Optional formatting improvements
- `model()`: Optional model selection for better accuracy

## Expected Output

With sentiment analysis enabled, you'll see output like:
```
Full Response:
{
  "sentiment": {
    "overall": "positive",
    "score": 0.73
  },
  "channels": [...],
  ...
}

Transcript: So that was a big step for NASA.
Word: So - Sentiment: {...}
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable

## Run

```bash
cargo run
```

## Notes

- Sentiment analysis works best with emotionally expressive speech
- Sentiment scores may appear in `response.results.sentiment` or at the word level
- Values typically range from -1 (negative) to +1 (positive) with 0 being neutral
- Useful for customer service analysis, feedback evaluation, and content moderation
- May not detect subtle emotional nuances in very formal or technical speech