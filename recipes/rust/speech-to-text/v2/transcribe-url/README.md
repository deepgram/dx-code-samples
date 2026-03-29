# Deepgram Rust SDK: Speech-to-Text v2 URL Transcription

Demonstrates real-time streaming transcription of a remote audio file using Deepgram's Flux v2 API. The Flux API provides enhanced accuracy and real-time streaming capabilities for English audio.

## What This Example Does

This example downloads an audio file from a URL, then streams it through Deepgram's Flux v2 API to get real-time transcription results. Unlike traditional batch transcription, Flux provides streaming updates as the audio is processed.

## Key Parameters

- `model: Model::FluxGeneralEn` - Enables Flux v2 model for enhanced English transcription
- `encoding: Encoding::Linear16` - Specifies 16-bit linear PCM audio format
- `sample_rate: 44100` - Audio sample rate in Hz
- Streaming parameters: chunk size (3174 bytes) and frame delay (16ms) for real-time processing

## Expected Output

```
Starting Flux transcription...
Connected to Flux API
Transcript: That's one small step for man
Transcript: That's one small step for man one giant leap for mankind
```

The output shows progressive transcription updates as the audio is processed, with each update potentially refining or extending the previous transcript.

## Prerequisites

Set your Deepgram API key as an environment variable:
```bash
export DEEPGRAM_API_KEY="your-api-key"
```

## Run the Example

```bash
cargo run
```

## Notes

- Flux v2 requires internet connectivity to download the audio file
- The example uses spacewalk.wav (Neil Armstrong's moon landing quote)
- Transcription quality may vary based on audio quality and speech clarity
- Some updates may contain empty transcripts during processing pauses