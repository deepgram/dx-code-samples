/**
 * Recipe: Smart Format (Speech-to-Text v1)
 * ==========================================
 * Demonstrates the `smart_format` feature, which automatically applies
 * formatting to the transcript: numbers, dates, currencies, addresses,
 * and other entities are converted to their written form.
 *
 * Without smart_format: "I have three hundred dollars"
 * With smart_format:    "I have $300"
 *
 * smart_format is a superset of punctuate + numerals + other formatting.
 * See also: speech-to-text/v1/punctuate for punctuation-only formatting.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,  // <-- THIS is the feature this recipe demonstrates.
                         // Applies number/date/currency/address formatting.
    // Optional: language="en", punctuate=true (already included in smart_format)
  });

  // The transcript at channels[0].alternatives[0].transcript will contain
  // formatted text — "$300" instead of "three hundred dollars", etc.
  const transcript = response.results?.channels?.[0]?.alternatives?.[0]?.transcript;
  if (transcript) {
    console.log(transcript);
  }
}

main().catch(console.error);