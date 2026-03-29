/**
 * Recipe: Punctuation (Speech-to-Text v1)
 * =========================================
 * Demonstrates the `punctuate` feature, which adds punctuation marks
 * (periods, commas, question marks) to the transcript.
 *
 * Without punctuate: "yeah as much as its worth celebrating"
 * With punctuate:    "Yeah, as much as it's worth celebrating."
 *
 * Note: smart_format includes punctuation plus additional formatting.
 * Use punctuate alone when you want punctuation without number/date formatting.
 * See also: speech-to-text/v1/smart-format for full formatting.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    punctuate: true,  // <-- THIS is the feature this recipe demonstrates.
                      // Adds periods, commas, question marks, etc.
    // Optional: smart_format=true (superset), language="en"
  });

  // The transcript at channels[0].alternatives[0].transcript will
  // contain properly punctuated text.
  const transcript = response.results?.channels?.[0]?.alternatives?.[0]?.transcript;
  if (transcript) {
    console.log(transcript);
  }
}

main().catch(console.error);