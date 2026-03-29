/**
 * Recipe: Select Audio Encoding (Text-to-Speech v1)
 * =====================================================
 * Demonstrates choosing the output audio encoding for TTS.
 *
 * Available encodings: linear16 (raw PCM), mp3, opus, flac, aac, mulaw.
 * The encoding affects file size, quality, and compatibility.
 *
 * See also: text-to-speech/v1/select-model for voice selection,
 *           text-to-speech/v1/generate-audio for basic TTS.
 */

import { DeepgramClient } from "@deepgram/sdk";

async function main() {
  const client = new DeepgramClient();

  const response = await client.speak.v1.audio.generate({
    text: "Hello! This audio uses MP3 encoding from Deepgram.",
    model: "aura-2-thalia-en",
    encoding: "mp3",      // <-- THIS selects the encoding. Options: linear16, mp3, opus, flac, aac, mulaw
    container: "none",    // "none" for raw encoded stream, "wav" only for linear16
    // Optional: sample_rate=24000, bit_rate=128000
  });

  const stream = response.stream();
  const reader = stream.getReader();
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.length;
  }

  console.log(`Generated MP3 audio: ${totalBytes} bytes`);
}

main().catch(console.error);