# Smart Format

Applies smart formatting to transcripts, automatically converting spoken numbers, dates, times, and currencies into their written forms. This feature makes transcripts more readable and professional.

## What this feature does

Smart formatting post-processes the raw transcript to convert spoken entities into their conventional written forms. For example, "twenty-three dollars and fifty cents" becomes "$23.50", "January first twenty twenty-four" becomes "January 1st, 2024", and phone numbers are properly formatted.

## Key parameters

- **smart_format(true)**: Enables intelligent formatting of numbers, dates, currencies, and other entities

## Sample output

With smart formatting enabled, you'll see enhanced formatting compared to raw transcription:

```
NASA, that's 1 small step for man, 1 giant leap for mankind.
```

Note: The exact formatting improvements depend on the specific content in the audio.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable

## Run the example

```bash
cargo run
```