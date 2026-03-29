# Redaction (Speech-to-Text v1)

Redact sensitive information like credit card numbers and SSNs from the transcript.

## What it does

When enabled, Deepgram identifies and replaces sensitive information in the transcript with redaction markers. This helps with compliance requirements (PCI-DSS, HIPAA) when processing audio that may contain payment data or personal identifiers.

## Key parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `redact` | `["pci", "ssn"]` | Types of data to redact: "pci", "ssn", or "numbers" |
| `model` | `"nova-3"` | Transcription model |

## Example output

```
My credit card number is [REDACTED] and my social is [REDACTED].
```

## Prerequisites

- Node.js 20+
- Set `DEEPGRAM_API_KEY` environment variable
- Install dependencies: `npm install`

## Run

```bash
node example.js
```