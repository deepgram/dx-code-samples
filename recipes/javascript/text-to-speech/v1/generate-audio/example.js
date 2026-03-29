/**
 * Recipe: Generate Audio to File (Text-to-Speech v1)
 * =====================================================
 * Demonstrates the basic TTS operation: convert text to speech and save
 * the audio to a local file.
 *
 * generate() returns a response with a stream() method to access the audio.
 * This is the simplest TTS recipe; see also:
 * - text-to-speech/v1/stream-audio       — stream audio chunks
 * - text-to-speech/v1/websocket-streaming — low-latency WebSocket TTS
 * - text-to-speech/v1/select-model        — choose different voices
 * - text-to-speech/v1/select-encoding     — choose audio encoding
 */

import { DeepgramClient } from "@deepgram/sdk";
import { writeFile } from "node:fs/promises";

const TEXT = "Hello! This is a Deepgram text-to-speech example using the aura-2 voice model.";

async function main() {
  const client = new DeepgramClient();

  const response = await client.speak.v1.audio.generate({
    text: TEXT,
    model: "aura-2-thalia-en",  // <-- aura-2 voice model (see select-model for others)
    encoding: "linear16",
    container: "wav",
    // Optional: sample_rate=24000, bit_rate=128000
  });

  // response.stream() returns a ReadableStream of audio bytes
  const stream = response.stream();
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const buffer = Buffer.concat(chunks);
  await writeFile("output.wav", buffer);
  console.log(`Audio saved: output.wav (${buffer.length} bytes)`);
}

main().catch(console.error);