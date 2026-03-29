# Deepgram Rust SDK: Speech-to-Text v2 Live Streaming

Demonstrates live streaming transcription using Deepgram's Flux v2 API. This example simulates real-time audio streaming by processing a file with timing delays that mimic live audio input.

## What This Example Does

This example streams audio data to Deepgram's Flux v2 API in real-time, receiving continuous transcription updates as the audio is processed. The streaming approach provides lower latency compared to batch processing and is ideal for live applications.

## Key Parameters

- `model: Model::FluxGeneralEn` - Uses Flux v2 for enhanced streaming transcription
- `encoding: Encoding::Linear16` - Audio encoding format (16-bit PCM)
- `sample_rate: 44100` - Audio sample rate in Hz
- `chunk_size: 3174` - Audio chunk size in bytes for streaming
- `frame_delay: 16ms` - Delay between chunks to simulate real-time audio

## Expected Output

```
Starting live streaming transcription...
🔴 Live streaming connected
🎙️  Turn started
📝 Live: That's one small step
📝 Live: That's one small step for man
📝 Live: That's one small step for man one giant leap for mankind
✅ Turn completed
🏁 Streaming session ended
```

The output shows real-time transcription updates with progressive refinement of the transcript as more audio is processed.

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

- Flux v2 streaming provides lower latency than traditional batch processing
- Chunk size and frame delay can be adjusted based on your latency requirements
- Smaller chunks = lower latency but higher API overhead
- The example uses spacewalk.wav for consistent testing results
- In production, you would stream live audio from a microphone or audio source