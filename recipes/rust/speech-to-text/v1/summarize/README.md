# Speech Summarization

This recipe demonstrates automatic summarization, which generates a concise summary of the key points from audio content. Instead of providing a complete word-for-word transcript, summarization extracts and condenses the main ideas and important information.

## What it does

Summarization analyzes the full transcript and generates a brief overview highlighting the most important points and key takeaways. This is useful for quickly understanding long recordings, meetings, or presentations without reading the entire transcript.

## Key Parameters

- `summarize(true)`: Enables automatic content summarization
- `smart_format(true)`: Optional formatting improvements
- `model()`: Optional model selection for best results

## Expected Output

With summarization enabled, you'll see output like:
```
Full Response:
{
  "summary": {
    "text": "NASA achieved a major milestone in space exploration with this significant step forward."
  },
  "channels": [...],
  ...
}

Transcript: So that was a big step for NASA.
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable

## Run

```bash
cargo run
```

## Notes

- Summarization works best with longer audio content (1+ minutes)
- Summary appears in `response.results.summary` or `response.results.summaries`
- May not generate summaries for very short audio clips
- Requires more processing time than basic transcription
- Best used with clear, structured speech like presentations or meetings