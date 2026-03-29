# Language Detection

This recipe demonstrates automatic language detection, which identifies the primary language spoken in an audio file without requiring you to specify the language in advance. Deepgram analyzes the audio content and returns both the detected language and the transcript.

## What it does

Language detection automatically identifies the spoken language in your audio and transcribes accordingly. This eliminates the need to know the language beforehand and is useful for processing multilingual content or unknown language audio.

## Key Parameters

- `detect_language(DetectLanguage::Enabled)`: Enables automatic language detection
- `smart_format(true)`: Optional formatting improvements
- `model()`: Optional model selection

## Expected Output

With language detection enabled, you'll see output like:
```
Detected Language: en
Transcript: So that was a big step for NASA.
Language: en (confidence: Some(0.99))
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable

## Run

```bash
cargo run
```

## Notes

- Language detection works best with audio containing at least a few seconds of speech
- Detected language appears in `response.results.channels[0].alternatives[0].language`
- Overall language confidence may appear in `response.results.languages` 
- Supports 30+ languages including English, Spanish, French, German, Japanese, etc.
- May incur additional processing time compared to specifying language directly