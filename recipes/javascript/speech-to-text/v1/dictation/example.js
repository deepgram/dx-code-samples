/**
 * Recipe: Dictation Mode (Speech-to-Text v1)
 * =============================================
 * Demonstrates the `dictation` feature, which formats the transcript using
 * dictation-style spoken punctuation commands.
 *
 * Without dictation: spoken words like "period" or "comma" appear as text.
 * With dictation:    spoken punctuation commands are converted to actual
 *                    punctuation marks (e.g., "period" becomes ".").
 *
 * Useful for hands-free document creation where speakers dictate punctuation.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    dictation: true,  // <-- THIS is the feature this recipe demonstrates.
                      // Converts spoken punctuation commands to punctuation marks.
  });

  const transcript = response.results?.channels?.[0]?.alternatives?.[0]?.transcript;
  if (transcript) {
    console.log(transcript);
  }
}

main().catch(console.error);
