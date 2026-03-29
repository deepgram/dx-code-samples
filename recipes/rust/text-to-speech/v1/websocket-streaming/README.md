# Deepgram Rust SDK: Text-to-Speech v1 WebSocket-Style Streaming

Demonstrates WebSocket-style streaming for text-to-speech using the streaming API. This example simulates the low-latency, real-time behavior typical of WebSocket connections for immediate audio playback.

## What This Example Does

This example demonstrates streaming text-to-speech with WebSocket-like characteristics - immediate processing of audio chunks as they arrive, optimized for real-time applications with minimal latency. The streaming approach mimics WebSocket behavior for live audio applications.

## Key Parameters

- `speak_to_stream()` - Provides WebSocket-like streaming behavior
- `model: SpeakModel::AuraAsteriaEn` - Voice model for speech generation  
- `encoding: SpeakEncoding::Linear16` - Standard PCM encoding for real-time audio
- `sample_rate: 16000` - Lower sample rate optimized for reduced latency
- `container: Container::Wav` - Audio container format

## Expected Output

```
Starting WebSocket-style TTS streaming...
Text: "WebSocket-style streaming provides the lowest latency for real-time text-to-speech applications."
🔗 Simulating WebSocket-like streaming connection...
⚡ Real-time chunk 1: 4096 bytes (low-latency)
⚡ Real-time chunk 2: 4096 bytes (low-latency)
⚡ Real-time chunk 3: 3872 bytes (low-latency)
✅ WebSocket-style streaming session completed!
📊 Total audio streamed: 12064 bytes
📦 Chunks transmitted: 3
⚡ Format optimized for real-time: 16kHz WAV
```

The output emphasizes real-time processing characteristics similar to WebSocket streaming.

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

- This example uses `speak_to_stream()` as the closest equivalent to WebSocket TTS streaming
- WebSocket-style streaming prioritizes low latency over audio quality
- 16kHz sample rate provides good quality with minimal latency
- In production WebSocket implementations, chunks would be transmitted immediately
- Ideal for real-time applications like voice assistants, live translation, or interactive audio
- Future SDK versions may include dedicated WebSocket TTS APIs
- The streaming approach allows immediate audio playback without waiting for complete generation