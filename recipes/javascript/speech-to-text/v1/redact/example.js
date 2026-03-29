/**
 * Recipe: Redaction (Speech-to-Text v1)
 * =======================================
 * Demonstrates the `redact` feature, which replaces sensitive information
 * (PCI, PII, SSNs) in the transcript with redaction markers.
 *
 * Without redact: sensitive data appears as spoken.
 * With redact:    credit card numbers, SSNs, and other PII are replaced
 *                 with redaction markers in the transcript.
 *
 * Available redaction types: "pci" (payment card info), "ssn" (social security),
 * "numbers" (all numbers).
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    redact: ["pci", "ssn"],  // <-- THIS is the feature this recipe demonstrates.
                              // Redacts payment card info and SSNs from transcript.
    // Available values: "pci", "ssn", "numbers"
  });

  // The transcript at channels[0].alternatives[0].transcript will have
  // sensitive data replaced with redaction markers.
  // Note: the spacewalk demo audio may not contain PCI/SSN data, so
  // redaction may not visibly alter this particular transcript.
  const transcript = response.results?.channels?.[0]?.alternatives?.[0]?.transcript;
  if (transcript) {
    console.log(transcript);
  }
}

main().catch(console.error);