# Deepgram Rust SDK: Text-to-Speech v1 Audio Streaming

Demonstrates streaming audio data from Deepgram's text-to-speech API instead of saving to a file. This approach is useful for real-time applications that need to process audio as it's generated.

## What This Example Does

This example converts text to speech and receives the audio data as a stream of chunks. Instead of waiting for the complete audio file, the application processes audio data as it arrives, which is ideal for low-latency applications or real-time audio playback.

## Key Parameters

- `speak_to_stream()` - Streams audio data instead of saving to file
- `model: SpeakModel::AuraAsteriaEn` - Voice model for speech generation
- `encoding: SpeakEncoding::Linear16` - 16-bit linear PCM audio encoding
- `sample_rate: 24000` - Higher sample rate for better streaming quality
- `container: Container::Wav` - Audio container format

## Expected Output

```
Starting streaming text-to-speech...
Text: "This is a streaming text-to-speech example. The audio data is received in chunks as it's generated."
🎵 Receiving audio stream...
📦 Received chunk 1: 4096 bytes
📦 Received chunk 2: 4096 bytes
📦 Received chunk 3: 4096 bytes
📦 Received chunk 4: 2048 bytes
✅ Streaming completed!
📊 Total audio data: 14336 bytes
📦 Total chunks: 4
🎧 Audio format: 24kHz WAV, 16-bit PCM
```

The output shows real-time reception of audio chunks with their individual sizes and the total data received.

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

- Streaming provides lower latency compared to file generation
- Chunk sizes may vary depending on audio content and processing
- In production, you would typically play chunks immediately or buffer them
- Higher sample rates (24kHz) provide better quality but larger data sizes
- The Stream trait allows integration with Rust async ecosystems
- Useful for real-time applications like voice assistants or live audio feeds