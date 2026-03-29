# Content Redaction

This recipe demonstrates automatic content redaction, which identifies and removes sensitive information from transcripts. Redaction replaces sensitive data like credit card numbers, social security numbers, and personal information with placeholder text to protect privacy and ensure compliance.

## What it does

Content redaction scans the transcript for sensitive information patterns and replaces them with generic placeholders. This helps protect personally identifiable information (PII) and financial data while maintaining the overall meaning and flow of the transcript.

## Key Parameters

- `redact(vec![Redact::Pci, Redact::Ssn])`: Enables redaction for specific data types
- `smart_format(true)`: Optional formatting improvements  
- `model()`: Optional model selection for better accuracy

## Expected Output

With redaction enabled, you'll see output like:
```
Redacted Transcript: My credit card number is [CREDIT_CARD_NUMBER] and my SSN is [SSN].

Full Response:
{
  "channels": [...],
  ...
}
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable

## Run

```bash
cargo run
```

## Notes

- Redacted content appears in the normal transcript with sensitive data replaced by placeholders
- Available redaction types include PCI (payment card), SSN (social security), and others
- Redaction may not catch all patterns - review output for compliance requirements
- Only works when the audio actually contains the specified sensitive data types
- Useful for compliance with HIPAA, PCI DSS, and other privacy regulations