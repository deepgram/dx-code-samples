# Conversation Export to JSON, SRT, and WebVTT (Voice Agents v1)

Export a voice agent conversation to three industry-standard transcript formats in real time.

## What it does

Connects to a Deepgram voice agent session and accumulates every `ConversationText` event (both user and agent turns) with elapsed timestamps. When the session ends, the collected turns are formatted and printed as:

- **JSON** — structured array with role, content, and millisecond timestamps for database storage or search indexing
- **SRT** — numbered subtitle cues with `HH:MM:SS,mmm` timestamps and speaker labels, compatible with most video players
- **WebVTT** — W3C web caption format with `<v Speaker>` voice tags for browser-native `<track>` elements

Transcripts are available the moment the conversation ends with no post-processing step required.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `listen.provider` | `deepgram/nova-3` | Speech recognition model |
| `think.provider` | `open_ai/gpt-4o-mini` | LLM for conversation logic |
| `speak.provider` | `deepgram/aura-2-thalia-en` | TTS voice model |
| `ConversationText` event | `role`, `content` | Captured per turn with elapsed time |

## Example output

```
Agent: Hello! How can I help you today?
User: Tell me about the spacewalk.

=== JSON ===
{
  "turns": [
    { "role": "Agent", "content": "Hello! How can I help you today?", "timestamp_ms": 1023 },
    { "role": "User", "content": "Tell me about the spacewalk.", "timestamp_ms": 5210 }
  ]
}

=== SRT ===
1
00:00:01,023 --> 00:00:05,210
[Agent] Hello! How can I help you today?

2
00:00:05,210 --> 00:00:08,210
[User] Tell me about the spacewalk.

=== WebVTT ===
WEBVTT

00:00:01.023 --> 00:00:05.210
<v Agent>Hello! How can I help you today?

00:00:05.210 --> 00:00:08.210
<v User>Tell me about the spacewalk.
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```
