# Measurements (STT v1)

Converts spoken measurements into standard abbreviated forms in the transcript.

## What it does

The `measurements` parameter tells Deepgram to format spoken measurement expressions using standard abbreviations. For example, "five kilograms" becomes "5 kg", "ten miles per hour" becomes "10 mph", and "twenty degrees Celsius" becomes "20°C". This produces cleaner, more readable transcripts for technical or scientific content.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Deepgram transcription model |
| `measurements` | `true` | Converts spoken measurements to abbreviations |
| `smart_format` | `true` | Enables smart formatting |

## Example output

```
Yeah, as much as, it's funny when I think of anything that's related to
outer space, I think of is the first, the first shuttle launch...
```

## Prerequisites

- Deepgram CLI installed (`curl -fsSL https://deepgram.com/install.sh | sh`)
- `DEEPGRAM_API_KEY` environment variable set

## Run

```bash
bash example.sh
```

## Test

```bash
bash example_test.sh
```
