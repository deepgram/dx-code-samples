# Multi-Configuration Audio Analysis

Process the same audio recording with multiple Deepgram configurations to extract different insights. This pattern is foundational for contact centers and compliance systems that need to re-analyze conversations with different models, keyword lists, or intelligence features without repeating the original recording.

## How it works

The example sends the same audio URL to Deepgram three times, each with a different set of parameters:

| Configuration | Parameters | What it extracts |
|---|---|---|
| **Base transcription** | `model="nova-3"`, `smart_format=True` | Clean formatted transcript |
| **Diarization + Keywords** | `diarize=True`, `keywords=["spacewalk:2", "ISS:1.5"]` | Speaker labels, boosted keyword accuracy |
| **Audio Intelligence** | `summarize="v2"`, `topics=True`, `sentiment=True` | Summary, topic list, sentiment scores |

## Key parameters

- **`diarize`** — identify and label individual speakers
- **`keywords`** — boost recognition accuracy for specific terms (format: `"term:weight"`)
- **`summarize`** — generate a concise summary (`"v2"` for the latest summarization model)
- **`topics`** — detect topics discussed in the audio
- **`sentiment`** — analyze sentiment per transcript segment

## Prerequisites

1. A Deepgram API key — set it as an environment variable:
   ```bash
   export DEEPGRAM_API_KEY="your-key-here"
   ```
2. Install dependencies:
   ```bash
   pip install deepgram-sdk==v7.8.0
   ```

## Run

```bash
python example.py
```

## Example output

```
[Config 1 — Base] Yeah, as you know, when I was the first person to land on the moon, I was really excited...
[Config 2 — Diarize+Keywords] 2 speakers detected
[Config 3 — Intelligence] Summary: The conversation covers a discussion about a spacewalk...
[Config 3 — Intelligence] Topics: space exploration, spacewalk, ISS
```
