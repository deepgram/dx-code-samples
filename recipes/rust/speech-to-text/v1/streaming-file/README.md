# File Streaming Transcription

This recipe demonstrates streaming transcription of a local audio file over WebSocket. File streaming simulates real-time processing by sending file chunks progressively, which is useful for large files, when you want real-time feedback, or to process files as if they were live audio streams.

## What it does

File streaming downloads an audio file locally, then streams it chunk-by-chunk over a WebSocket connection to Deepgram. This provides real-time transcription results with interim results as the file is processed, similar to live streaming but using a pre-recorded file as the source.

## Key Parameters

- `interim_results(true)`: Enables partial results during file streaming
- `file(path, chunk_size, delay_ms)`: Configures file streaming parameters
- `encoding(Encoding::Linear16)`: Specifies audio encoding format
- `sample_rate(44100)`: Audio sample rate configuration

## Expected Output

With file streaming enabled, you'll see output like:
```
Downloaded audio file to /tmp/spacewalk.wav
Starting file streaming transcription...
Streaming result: InterimResult { transcript: "So", is_final: false }
Streaming result: InterimResult { transcript: "So that", is_final: false }
Streaming result: FinalResult { transcript: "So that was a big step for NASA.", confidence: 0.95 }
File streaming completed
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable
- Internet connection for file download and WebSocket streaming

## Run

```bash
cargo run
```

## Notes

- First downloads the audio file, then streams it chunk by chunk
- Chunk size and delay can be tuned for different streaming characteristics
- Interim results provide progressive transcription as file is streamed
- Useful for processing large audio files with real-time feedback
- Temporary file is cleaned up after streaming completes