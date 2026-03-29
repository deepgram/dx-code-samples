/**
 * Recipe: Language Detection (Speech-to-Text v1)
 * =================================================
 * Demonstrates the `detect_language` feature, which automatically detects
 * the spoken language in the audio.
 *
 * Without detect_language: you must specify the language manually.
 * With detect_language:    Deepgram identifies the language and includes
 *                          it in the response metadata.
 *
 * Useful when processing audio in unknown or mixed languages.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    detect_language: true,  // <-- THIS is the feature this recipe demonstrates.
                            // Automatically detects spoken language.
    // Note: do not set `language` when using detect_language
  });

  // Detected language is in the channel metadata:
  //   response.results.channels[0].detected_language — ISO 639-1 code (e.g., "en")
  // The transcript is still at:
  //   response.results.channels[0].alternatives[0].transcript
  const channel = response.results?.channels?.[0];
  if (channel) {
    console.log(`Detected language: ${channel.detected_language}`);
    console.log(channel.alternatives[0].transcript);
  }
}

main().catch(console.error);