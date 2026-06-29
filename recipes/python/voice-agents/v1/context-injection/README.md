# Context Injection (Voice Agents v1)

Inject prior conversation context into a voice agent's prompt so it remembers information across sessions — the foundation for building agents with persistent cross-session memory.

## What it does

When a returning user connects, you retrieve their prior conversation summaries, preferences, and key facts from your storage layer (a vector database, key-value store, or any persistence backend). These are formatted into the agent's `think.prompt` before the session begins, giving the LLM full awareness of past interactions without the user repeating themselves.

This recipe demonstrates the Deepgram-specific pattern: constructing a prompt with prior context items and configuring the voice agent to use it. The storage and retrieval layer is application-specific — you can use ChromaDB, Pinecone, Redis, or any database that fits your needs.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `think.prompt` | `str` | System prompt with injected prior context |
| `AgentV1InjectUserMessage` | message object | Programmatically inject a user message to trigger the agent |
| `send_inject_user_message()` | method | Send the injected message to the agent |
| `think.provider` | `ThinkSettingsV1Provider_OpenAi` | LLM provider that processes the context-enriched prompt |

## Example output

```
Injected 3 prior context items into agent prompt
Connection opened
Settings applied with prior context injected
[user] Hi! Can you remind me about my upcoming trip?
[assistant] Hi Alex! Of course — you mentioned planning a trip to Tokyo in March. Would you like help with restaurant recommendations? I'll make sure to note your shellfish allergy.
Received 24576 bytes of audio
Connection closed
```

## Architecture for production use

```
Session Start
  ├─ Identify user (auth, caller ID, etc.)
  ├─ Query vector DB for top-k relevant memories
  ├─ Build prompt with retrieved context  ← this recipe demonstrates this step
  └─ Configure agent with context-enriched prompt

Session End
  ├─ Summarize conversation via LLM
  ├─ Embed summary and store in vector DB
  └─ Tag with user ID and timestamp
```

## Prerequisites

- Python 3.10+
- Set `DEEPGRAM_API_KEY` environment variable
- Install: `pip install -r recipes/python/requirements.txt`

## Run

```bash
python example.py
```

## Test

```bash
pytest example_test.py -v
```
