# Live Streaming Transcription

This recipe demonstrates real-time speech-to-text streaming over WebSocket connections. Streaming provides immediate transcription results as audio is sent, enabling live applications like real-time captions, voice commands, and interactive voice interfaces.

## What it does

Streaming transcription establishes a WebSocket connection to Deepgram and sends audio data in real-time chunks, receiving immediate transcription results including interim (partial) results and final transcripts. This enables live processing without waiting for complete audio files.

## Key Parameters

- `interim_results(true)`: Enables partial results before final transcription
- `encoding(Encoding::Linear16)`: Specifies audio encoding format
- `sample_rate(44100)`: Audio sample rate configuration  
- `channels(2)`: Number of audio channels

## Expected Output

With streaming enabled, you'll see output like:
```
Starting live transcription...
Streaming result: InterimResult { transcript: "So that", is_final: false }
Streaming result: InterimResult { transcript: "So that was", is_final: false }
Streaming result: FinalResult { transcript: "So that was a big step for NASA.", confidence: 0.95 }
Streaming session completed
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable
- Network connection for WebSocket streaming

## Run

```bash
cargo run
```

## Notes

- Streaming works best with continuous audio input (microphone, live audio feed)
- Interim results provide immediate feedback but may change as more audio is processed
- Final results are more accurate and stable than interim results
- WebSocket connection requires stable internet for best performance
- Useful for live captions, voice assistants, and real-time voice analysis