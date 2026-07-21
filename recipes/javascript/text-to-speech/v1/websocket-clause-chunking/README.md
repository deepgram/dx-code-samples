# Clause-Boundary Chunked TTS (Text-to-Speech v1)

Reduce time-to-first-audio by splitting text at clause boundaries and flushing each clause to WebSocket TTS independently.

## What it does

In a typical voice-agent pipeline, the LLM streams tokens that form sentences. Waiting for a full sentence before sending it to TTS adds hundreds of milliseconds of silence. This recipe splits text at natural clause boundaries (commas, semicolons, colons, sentence ends) and sends each clause to the TTS WebSocket immediately, followed by a Flush. The server begins synthesizing audio for the first clause while subsequent clauses are still arriving, so the user hears speech sooner.

**Full-sentence dispatch:** LLM finishes sentence → send to TTS → wait for synthesis → play audio

**Clause-level dispatch:** LLM emits first clause → send to TTS + Flush → audio begins playing while remaining clauses stream in

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `model` | `"aura-2-thalia-en"` | Voice model for synthesis |
| `encoding` | `"linear16"` | Raw PCM audio encoding |
| `type: "Speak"` | per clause | Sends one clause of text at a time |
| `type: "Flush"` | after each clause | Triggers audio generation for the preceding text |

## How clause splitting works

The example splits text at:
- Commas, semicolons, colons, em dashes (followed by whitespace)
- Sentence-ending periods (followed by whitespace)

Each fragment is sent as a separate Speak+Flush pair. The server returns a `Flushed` event after synthesizing each clause, allowing the client to track progress clause by clause.

## Example output

```
Clause 1/4 flushed (24576 bytes so far)
Clause 2/4 flushed (55296 bytes so far)
Clause 3/4 flushed (82944 bytes so far)
Clause 4/4 flushed (110592 bytes so far)
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```
