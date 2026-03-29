# Deepgram Rust SDK: Text-to-Speech v1 Encoding Selection

Demonstrates how to select different audio encodings for text-to-speech output. Different encodings offer trade-offs between audio quality, file size, and compatibility with various platforms and applications.

## What This Example Does

This example generates the same text using different audio encodings to show how encoding affects file size and quality. It helps you choose the right encoding based on your application's requirements for quality, bandwidth, and compatibility.

## Key Parameters

- `encoding: SpeakEncoding::Linear16` - Uncompressed 16-bit PCM for highest quality
- `encoding: SpeakEncoding::Mp3` - MP3 compression for smaller file sizes
- `container: Container::Wav` - WAV container for PCM audio
- `container: Container::Mp3` - MP3 container for compressed audio
- `sample_rate: 24000` - Consistent sample rate across encodings

## Expected Output

```
Demonstrating different audio encodings...
Text: "This demonstrates different audio encodings. Each encoding balances quality, file size, and compatibility."

🎵 Generating audio with Linear16 encoding...
   ✅ Encoding: Linear16
   📁 File: output_pcm.wav (156248 bytes)
   📊 Container: Wav
   💡 Description: Uncompressed PCM - highest quality, largest size
   📏 Reference size for comparison

🎵 Generating audio with Mp3 encoding...
   ✅ Encoding: Mp3
   📁 File: output_mp3.mp3 (14532 bytes)
   📊 Container: Mp3
   💡 Description: MP3 compressed - good quality, smaller size
   🗜️  Compression: ~10-12x smaller than PCM

🎯 Encoding comparison completed!
📋 Encoding selection guidelines:
   • Linear16/PCM: Best quality, use for professional audio
   • MP3: Balanced quality/size, ideal for web applications
   • Choose based on bandwidth and quality requirements
```

The output shows the significant file size differences between encodings while maintaining the same audio content.

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

- Linear16 (PCM) provides the highest quality but largest file sizes
- MP3 offers good quality with significant file size reduction (10-12x smaller)
- Choose encoding based on your bandwidth and quality requirements
- PCM is ideal for professional audio applications and local playback
- MP3 is perfect for web applications and streaming where bandwidth matters
- File sizes vary based on audio content and speech duration
- Container format must match the encoding (WAV for PCM, MP3 for MP3)
- Additional encodings may be available: Opus, AAC, etc.