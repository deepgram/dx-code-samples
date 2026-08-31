# Smart Format Composability

Deepgram allows you to activate multiple STT features simultaneously in a single API call. Unlike some competing platforms that impose mutual exclusivity between formatting modes and features like diarization or word timestamps, Deepgram's features are fully composable — you can combine smart formatting, speaker diarization, utterance segmentation, paragraph grouping, key term boosting, and PII redaction all at once.

This recipe demonstrates that composability by enabling six features together in one pre-recorded transcription request.

## Features Enabled

| Parameter | Value | What It Does |
|---|---|---|
| `smart_format` | `True` | Applies intelligent formatting: numbers, dates, currencies, punctuation |
| `diarize` | `True` | Assigns a speaker label (0, 1, …) to every word |
| `utterances` | `True` | Segments the transcript into speaker-attributed utterance blocks |
| `paragraphs` | `True` | Groups sentences into natural paragraph breaks |
| `keyterm` | `"spacewalk"` | Boosts recognition accuracy for the term "spacewalk" (Nova-3) |
| `redact` | `"pci"` | Redacts payment card numbers from the transcript |

## Prerequisites

1. A [Deepgram API key](https://console.deepgram.com/)
2. Python 3.10+

```bash
pip install deepgram-sdk
export DEEPGRAM_API_KEY="your-api-key"
```

## Run

```bash
python example.py
```

## Example Output

```
=== Word-level detail (speaker + timestamps) ===
  [0.08s] Speaker 0: Yeah.
  [0.48s] Speaker 0: As
  [0.56s] Speaker 0: much
  [0.72s] Speaker 0: as
  ...

=== Utterances ===
  Speaker 0: Yeah. As much as it's worth celebrating...
  Speaker 1: We've got a great day ahead...

=== Paragraphs ===
  Speaker 0: Yeah. As much as it's worth celebrating the...
  Speaker 1: We've got a great day ahead of us today...

=== Transcript (formatted + redacted) ===
Yeah. As much as it's worth celebrating the...
```

## Why Composability Matters

Many speech platforms force trade-offs: enabling smart formatting may disable diarization, or word timestamps may be unavailable alongside certain formatting modes. Deepgram imposes no such restrictions — every feature listed above works simultaneously in a single request, giving you rich, production-ready output without multiple API calls or post-processing workarounds.
