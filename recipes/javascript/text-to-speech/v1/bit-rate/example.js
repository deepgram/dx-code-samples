/**
 * Recipe: Bit Rate Control (Text-to-Speech v1)
 * ===============================================
 * Demonstrates the `bit_rate` parameter, which controls the output audio
 * bit rate for compressed encodings like mp3.
 *
 * Lower bit rates produce smaller files at the cost of audio quality.
 * Higher bit rates preserve more audio detail. Common mp3 bit rates:
 *   32000  — low quality, small files (voice-only, bandwidth-constrained)
 *   48000  — medium quality
 *   128000 — high quality (default for mp3)
 *   192000 — very high quality
 */

import { DeepgramClient } from "@deepgram/sdk";
import { writeFile } from "node:fs/promises";
import { statSync } from "node:fs";

const TEXT = "Hello! This audio demonstrates bit rate control with Deepgram text-to-speech.";

async function main() {
  const client = new DeepgramClient();

  const response = await client.speak.v1.audio.generate({
    text: TEXT,
    model: "aura-2-thalia-en",
    encoding: "mp3",
    bit_rate: 48000,  // <-- THIS controls the output bit rate.
                      // 48 kbps mp3 — smaller file, suitable for voice content.
  });

  const stream = response.stream();
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const buffer = Buffer.concat(chunks);
  await writeFile("output.mp3", buffer);
  console.log(`Saved output.mp3 (${buffer.length} bytes) — encoding: mp3, bit_rate: 48000`);
}

main().catch(console.error);
