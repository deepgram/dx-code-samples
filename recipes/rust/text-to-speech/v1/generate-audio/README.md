# Deepgram Rust SDK: Text-to-Speech v1 Audio Generation

Demonstrates converting text to natural-sounding speech and saving it as an audio file using Deepgram's text-to-speech API with Aura voice models.

## What This Example Does

This example takes a text string and generates high-quality speech audio using Deepgram's Aura voice models. The audio is saved to a WAV file with specified encoding and sample rate settings.

## Key Parameters

- `model: SpeakModel::AuraAsteriaEn` - Uses Aura Asteria English voice model for natural speech
- `encoding: SpeakEncoding::Linear16` - 16-bit linear PCM encoding for high quality
- `sample_rate: 16000` - Audio sample rate (16kHz for good quality/size balance)
- `container: Container::Wav` - WAV file format for wide compatibility

## Expected Output

```
Generating audio from text...
Text: "Hello world! This is a text-to-speech demo using Deepgram's Rust SDK."
✅ Audio generated successfully!
📁 Output file: output.wav
📊 File size: 125832 bytes
🎵 Voice model: Aura Asteria (English)
🔧 Format: 16kHz WAV, 16-bit PCM
🗑️  Temporary file cleaned up
```

The output confirms successful audio generation with details about the file size and audio specifications.

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

- The example automatically cleans up the generated audio file after displaying information
- File size varies based on text length and audio settings
- Aura Asteria provides natural, human-like speech quality
- Other available sample rates: 8000, 24000, 48000 Hz
- Alternative voice models available (AuraOrpheusEn, AuraLunaEn, etc.)