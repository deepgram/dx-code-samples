# Key Term Prompting (STT v1)

Boosts recognition of specific key terms to improve transcription accuracy for domain-specific vocabulary.

## What it does

The `keyterm` parameter provides Nova-3 with a list of important terms that should be prioritized during transcription. This improves accuracy for proper nouns, product names, technical jargon, or any vocabulary that the model might otherwise misrecognize. Multiple key terms can be specified by repeating the parameter.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `nova-3` | Required — key term prompting is a Nova-3 feature |
| `keyterm` | `Deepgram` | A term to boost (repeat for multiple terms) |
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
