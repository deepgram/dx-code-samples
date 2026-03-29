# Utterances

Segments audio into individual utterances with precise timing and confidence information. Each utterance represents a continuous speech segment separated by natural pauses.

## What this feature does

Utterance detection automatically identifies speech segments in audio, providing structured output where each utterance includes its transcript, start time, end time, and confidence score. This is particularly useful for analyzing speech patterns, creating timestamps, or processing conversational audio.

## Key parameters

- **utterances(true)**: Enables speech segmentation into individual utterances with timing
- **punctuate(true)**: Recommended for better utterance text formatting

## Sample output

With utterance detection enabled, you'll see detailed timing information:

```
Utterance 1: 0.08s - 5.78s (confidence: 0.98)
NASA, that's one small step for man, one giant leap for mankind.
```

Note: Very short audio may produce single utterances or no utterance segmentation.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Works best with clear speech and natural pauses

## Run the example

```bash
cargo run
```