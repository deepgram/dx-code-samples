/**
 * Recipe: WebSocket Streaming TTS (Text-to-Speech v1)
 * ======================================================
 * Demonstrates low-latency text-to-speech via WebSocket for real-time use.
 *
 * The WebSocket TTS API allows sending text incrementally and receiving
 * audio chunks in real-time. Use Flush to signal end of a text segment.
 *
 * See also: text-to-speech/v1/generate-audio for REST-based TTS,
 *           text-to-speech/v1/stream-audio for REST streaming.
 */

import { DeepgramClient } from "@deepgram/sdk";

async function main() {
  const client = new DeepgramClient();

  const connection = await client.speak.v1.createConnection({
    model: "aura-2-thalia-en",
    encoding: "linear16",
    // Optional: sample_rate=24000
  });

  let audioBytes = 0;
  connection.on("message", (data) => {
    if (data instanceof ArrayBuffer || Buffer.isBuffer(data)) {
      audioBytes += data instanceof ArrayBuffer ? data.byteLength : data.length;
    } else if (data.type === "Flushed") {
      console.log(`Received Flushed event. Total audio: ${audioBytes} bytes`);
      setTimeout(() => connection.close(), 1000);
    }
  });

  connection.on("error", (err) => console.error("Error:", err));

  connection.connect();
  await connection.waitForOpen();

  // Send text and flush to receive audio
  connection.sendText({ type: "Speak", text: "Hello from Deepgram WebSocket TTS!" });
  connection.sendFlush({ type: "Flush" });

  await new Promise((resolve) => setTimeout(resolve, 15000));
  connection.close();
}

main().catch(console.error);