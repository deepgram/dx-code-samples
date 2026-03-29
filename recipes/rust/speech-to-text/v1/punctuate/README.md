# Punctuate

Automatically adds punctuation to transcripts based on speech patterns and natural language structure. This feature makes transcripts more readable by inserting commas, periods, question marks, and other punctuation marks.

## What this feature does

The punctuation feature analyzes speech patterns, pauses, and intonation to intelligently insert punctuation marks into the transcript. This transforms a raw stream of words into properly structured sentences and paragraphs.

## Key parameters

- **punctuate(true)**: Enables automatic punctuation insertion based on speech analysis

## Sample output

With punctuation enabled, you'll see properly structured sentences:

```
NASA, that's one small step for man, one giant leap for mankind.
```

Compare this to unpunctuated output which would be a continuous stream of words without sentence structure.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable

## Run the example

```bash
cargo run
```