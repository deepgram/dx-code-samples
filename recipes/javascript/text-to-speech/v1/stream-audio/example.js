/**
 * Recipe: Stream Audio Response (Text-to-Speech v1)
 * ====================================================
 * Demonstrates streaming TTS audio as it generates via the REST API.
 *
 * Instead of waiting for the full audio, this streams chunks as they arrive.
 * Useful for playing audio in real-time or piping to an audio player.
 *
 * See also: text-to-speech/v1/generate-audio for saving to a file,
 *           text-to-speech/v1/websocket-streaming for WebSocket-based TTS.
 */

import { DeepgramClient } from "@deepgram/sdk";

const TEXT = "Hello! This is a Deepgram text-to-speech streaming example.";

async function main() {
  const client = new DeepgramClient();

  const response = await client.speak.v1.audio.generate({
    text: TEXT,
    model: "aura-2-thalia-en",
    encoding: "linear16",  // <-- THIS selects the encoding. linear16 = raw PCM audio.
    container: "wav",
    // Optional: sample_rate=24000, bit_rate=128000
  });

  // Stream the response — process chunks as they arrive
  const stream = response.stream();
  const reader = stream.getReader();
  let totalBytes = 0;
  let chunkCount = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.length;
    chunkCount++;
  }

  console.log(`Streamed ${chunkCount} chunks, ${totalBytes} bytes total`);
}

main().catch(console.error);