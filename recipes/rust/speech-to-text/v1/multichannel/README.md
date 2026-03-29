# Multichannel Speech Recognition

This recipe demonstrates how to process multichannel audio files where each audio channel is transcribed separately. This is useful for stereo recordings, conference calls with multiple speakers on different channels, or any audio with distinct channel content.

## What it does

Multichannel processing analyzes each audio channel independently and returns separate transcripts for each channel. This differs from standard transcription which mixes all channels into a single transcript.

## Key Parameters

- `multichannel(true)`: Enables per-channel transcription processing
- `smart_format(true)`: Optional formatting improvements  
- `model()`: Optional model selection for better accuracy

## Expected Output

With multichannel enabled, you'll see output like:
```
Channel 0: So that was a big step for NASA.
Channel 1: Yes, it was a major milestone in space exploration.
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable

## Run

```bash
cargo run
```

## Notes

- Only works with audio files that actually have multiple channels
- Single-channel files will still work but only show Channel 0
- Each channel's transcript appears in `response.results.channels[n].alternatives[0].transcript`
- Useful for analyzing stereo recordings or conference calls with channel separation