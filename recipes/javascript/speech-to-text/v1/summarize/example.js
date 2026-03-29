/**
 * Recipe: Summarize (Speech-to-Text v1)
 * =======================================
 * Demonstrates the `summarize` feature, which generates a concise
 * summary of the transcript content.
 *
 * Without summarize: only the raw transcript is returned.
 * With summarize:    a `summaries` array is added to the response with
 *                    short text summaries of the audio content.
 *
 * See also: audio-intelligence/v1/summarize for the standalone version.
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
                      // Generates a concise summary. Use "v2" for the latest version.
    // Optional: language="en"
  });

  // Summary data path:
  //   response.results.summary.short — a brief text summary of the audio
  // The summary may be empty for very short audio clips.
  const summary = response.results?.summary;
  if (summary) {
    console.log("Summary:", summary.short);
  }

  const transcript = response.results?.channels?.[0]?.alternatives?.[0]?.transcript;
  if (transcript) {
    console.log("\nFull transcript:", transcript);
  }
}

main().catch(console.error);