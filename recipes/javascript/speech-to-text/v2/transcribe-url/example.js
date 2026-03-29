/**
 * Recipe: Transcribe Audio from URL — v2 API (Speech-to-Text v2)
 * ================================================================
 * Demonstrates pre-recorded transcription using the v2 API endpoint with
 * the flux-general-en model, optimized for English audio.
 *
 * The v2 API uses a different response format. Check the response structure
 * carefully — it differs from v1.
 *
 * See also: speech-to-text/v1/transcribe-url for the v1 equivalent.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v2.media.transcribeUrl({
    url: AUDIO_URL,
    model: "flux-general-en",  // <-- v2 uses flux-general-en for English
    smart_format: true,
    // v2 API: English-only, high-accuracy model
  });

  // v2 response structure may differ from v1 — check the actual response
  const transcript = response.results?.channels?.[0]?.alternatives?.[0]?.transcript;
  if (transcript) {
    console.log(transcript);
  } else {
    console.log(JSON.stringify(response, null, 2));
  }
}

main().catch(console.error);