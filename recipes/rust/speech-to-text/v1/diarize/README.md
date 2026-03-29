# Diarize

Identifies and labels different speakers in audio, providing speaker information for each word in the transcript. This feature is essential for processing conversations, meetings, and multi-speaker audio content.

## What this feature does

Speaker diarization analyzes audio to identify distinct speakers and assigns speaker labels (0, 1, 2, etc.) to each word in the transcript. This allows you to track who said what in conversations, separate speaker contributions, and create speaker-specific transcripts.

## Key parameters

- **diarize(true)**: Enables speaker identification and labeling for each word
- **punctuate(true)**: Recommended for better sentence structure in speaker output

## Sample output

With diarization enabled, you'll see speaker-labeled output:

```
Speaker 0: NASA, that's one small step for man, one giant leap for mankind.
```

Note: Single-speaker audio will typically show only Speaker 0. Multi-speaker audio will show different speaker numbers.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Works best with clear, distinct speakers

## Run the example

```bash
cargo run
```