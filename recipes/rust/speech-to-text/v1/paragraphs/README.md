# Paragraphs

Detects and structures transcripts into logical paragraphs with timing information. This feature groups related sentences together and provides start/end times for each paragraph segment.

## What this feature does

Paragraph detection analyzes speech patterns and content to automatically segment long-form transcripts into coherent paragraphs. Each paragraph includes its text content, start time, end time, and speaker information, making it easier to navigate and process long audio content.

## Key parameters

- **paragraphs(true)**: Enables automatic paragraph segmentation with timing information
- **punctuate(true)**: Recommended alongside paragraphs for better text structure

## Sample output

With paragraph detection enabled, you'll see structured output like:

```
Paragraph 1: 0.0 - 5.8
NASA, that's one small step for man, one giant leap for mankind.
```

Note: Short audio clips may not contain enough content for paragraph detection.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Works best with longer audio content (multiple sentences)

## Run the example

```bash
cargo run
```