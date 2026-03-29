# Audio Intelligence: Summarization

This example shows how to use Deepgram's AI summarization feature to automatically generate a concise summary of audio content. The summarization feature analyzes the full transcript and identifies the main topics, key points, and important information to create a structured summary.

## What does it do?

Audio Intelligence Summarization processes the entire transcript and generates:
- A concise overview of the main topics discussed
- Key points and important information extraction  
- A structured summary that highlights the most relevant content
- Condensed information that's easier to review than full transcripts

## Key parameters

- `summarize: true` - Enables AI-powered summarization of the audio content
- `model: "nova-3"` - Recommended model for best summarization results
- Can be combined with other intelligence features like sentiment and topics

## Example output

With summarization enabled, you'll see both the full transcript and a structured summary:

```
Transcript: [Full transcript text...]

AI Summary:
{
  "summary": {
    "short": "Brief one-sentence summary",
    "text": "Detailed summary covering main points and topics discussed"
  }
}
```

Note: Summarization works best with longer audio content (30+ seconds) containing substantial discussion or information.

## Prerequisites

- Set `DEEPGRAM_API_KEY` environment variable
- Audio file should contain meaningful content for summarization

## Run the example

```bash
cargo run
```