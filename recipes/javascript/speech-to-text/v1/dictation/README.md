# Dictation Mode — Speech-to-Text v1

Dictation mode formats the transcript by interpreting spoken punctuation commands as actual punctuation. When a speaker says words like "period", "comma", or "new paragraph", they are converted into the corresponding punctuation marks rather than appearing as literal text.

This is especially useful for hands-free document creation, medical dictation, or any scenario where speakers explicitly dictate punctuation.

## Key parameters

| Parameter | Type | Description |
|---|---|---|
| `dictation` | `boolean` | Enable dictation-style punctuation formatting |
| `model` | `string` | Speech model to use (e.g., `nova-3`) |
| `smart_format` | `boolean` | Apply additional formatting (numbers, dates, etc.) |

## Sample output

```
Yeah, as I recall, it was, um, probably about 10 minutes prior to actually leaving the capsule. It was back in March of 1965.
```

## Prerequisites

- Node.js 20+
- A [Deepgram API key](https://console.deepgram.com/signup?jump=keys)

## Run

```bash
export DEEPGRAM_API_KEY="your-api-key"
npm install
node example.js
```
