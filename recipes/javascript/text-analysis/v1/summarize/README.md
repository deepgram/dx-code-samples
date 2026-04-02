# Text Summarization — Text Analysis v1

Text summarization generates a concise summary from plain text input using Deepgram's Read API. No audio is required — the API works directly on text.

This is useful for creating quick overviews of long documents, articles, transcripts, or any text content.

## Key parameters

| Parameter | Type | Description |
|---|---|---|
| `summarize` | `string` | Set to `"v2"` to enable text summarization |
| `language` | `string` | Language of the text (e.g., `en`) |

## Sample output

```
Summary: Deepgram provides AI-powered speech recognition and text-to-speech APIs with the Nova-3 model, along with audio intelligence features, accessible through SDKs in multiple languages.
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
