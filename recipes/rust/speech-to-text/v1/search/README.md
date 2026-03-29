# Content Search

This recipe demonstrates content search, which identifies when specific keywords or phrases are spoken in audio. Search provides timestamps and context for when target terms appear, enabling easy navigation to relevant audio segments and content discovery.

## What it does

Content search analyzes the transcript to find occurrences of specified search terms and provides timing information for when those terms are spoken. This helps quickly locate relevant content within longer audio recordings.

## Key Parameters

- `extra(HashMap::from([("search", "NASA")])`: Adds search terms via query parameters
- `smart_format(true)`: Optional formatting improvements
- `model()`: Optional model selection for better accuracy

## Expected Output

With content search enabled, you'll see output like:
```
Full Response:
{
  "search": [
    {
      "term": "NASA",
      "hits": [
        {
          "start": 5.2,
          "end": 5.7,
          "confidence": 0.95
        }
      ]
    }
  ],
  "channels": [...],
  ...
}

Transcript: So that was a big step for NASA.
Found search term 'NASA' at 5.20s
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable

## Run

```bash
cargo run
```

## Notes

- Search results may appear in `response.results.search` with timing information
- Search is case-insensitive and matches partial words
- Multiple search terms can be added with multiple "search" parameters
- Only returns results when the search terms are actually found in the audio
- Useful for content indexing, compliance monitoring, and quick audio navigation