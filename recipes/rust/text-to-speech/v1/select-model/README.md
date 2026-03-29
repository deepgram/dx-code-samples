# Deepgram Rust SDK: Text-to-Speech v1 Model Selection

Demonstrates how to select different voice models for text-to-speech generation. Each voice model has unique characteristics in terms of gender, tone, accent, and speaking style.

## What This Example Does

This example generates speech using multiple voice models to showcase their different characteristics. It demonstrates how changing the voice model affects the audio output while keeping all other parameters constant.

## Key Parameters

- `model: SpeakModel::AuraOrpheusEn` - Deep, authoritative male voice
- `model: SpeakModel::AuraAsteriaEn` - Warm, friendly female voice  
- `encoding: SpeakEncoding::Linear16` - Consistent encoding across models
- `sample_rate: 24000` - High quality sample rate for voice comparison
- `container: Container::Wav` - Standard audio format

## Expected Output

```
Demonstrating different voice models...
Text: "This is a voice model demonstration. Different models have unique vocal characteristics."

🎤 Generating audio with Orpheus model...
   ✅ Voice: Orpheus (Deep, authoritative male voice)
   📁 File: voice_1.wav (127456 bytes)
   🎛️  Model: AuraOrpheusEn

🎤 Generating audio with Asteria model...
   ✅ Voice: Asteria (Warm, friendly female voice)
   📁 File: voice_2.wav (125832 bytes)
   🎛️  Model: AuraAsteriaEn

🎯 Voice model comparison completed!
💡 Different models provide unique voice characteristics:
   • Orpheus: Professional, authoritative tone
   • Asteria: Conversational, approachable tone
   • Choose based on your application's needs
```

The output shows generation of audio with different voice models and their characteristics.

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

- Voice models have different vocal characteristics and use cases
- Orpheus (male) is ideal for professional, authoritative content
- Asteria (female) works well for conversational, friendly applications
- File sizes may vary slightly between models due to voice characteristics
- Additional models may be available: AuraLunaEn, AuraHeliosEn, etc.
- Choose models based on your target audience and application context
- All models support the same encoding and sample rate options