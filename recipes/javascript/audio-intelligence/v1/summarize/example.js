/**
 * Recipe: Audio Summarization (Audio Intelligence v1)
 * =====================================================
 * Demonstrates audio summarization, generating a concise text summary
 * of spoken content.
 *
 * Without summarize: only the raw transcript is returned.
 * With summarize:    a `summary` object with a short text summary is added.
 *
 * This is the audio-intelligence version. The same feature is also
 * available as a speech-to-text parameter (see speech-to-text/v1/summarize).
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    summarize: "v2",  // <-- THIS is the feature this recipe demonstrates.
                      // Generates a concise summary. Use "v2" for latest.
  });

  // Summary data path:
  //   response.results.summary.short — brief text summary
  const summary = response.results?.summary;
  if (summary) {
    console.log("Summary:", summary.short);
  }
}

main().catch(console.error);