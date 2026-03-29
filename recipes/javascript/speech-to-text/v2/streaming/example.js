/**
 * Recipe: Live Streaming Transcription — v2 API (Speech-to-Text v2)
 * ===================================================================
 * Demonstrates WebSocket streaming with the v2 listen endpoint using
 * the flux-general-en model.
 *
 * The v2 WebSocket API has a different message format: it returns
 * "TurnInfo" messages instead of "Results" messages.
 *
 * See also: speech-to-text/v1/streaming for v1 WebSocket streaming.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const resp = await fetch(AUDIO_URL);
  const audioBuffer = Buffer.from(await resp.arrayBuffer());

  const connection = await client.listen.v2.createConnection({
    model: "flux-general-en",  // <-- v2 uses flux-general-en for English
    // v2 WebSocket params differ from v1
  });

  connection.on("message", (data) => {
    // v2 message types: "Connected", "TurnInfo", "FatalError"
    if (data.type === "TurnInfo") {
      console.log("Turn:", JSON.stringify(data));
    }
  });

  connection.on("error", (err) => console.error("Error:", err));

  connection.connect();
  await connection.waitForOpen();

  const CHUNK_SIZE = 4096;
  for (let i = 0; i < audioBuffer.length; i += CHUNK_SIZE) {
    connection.sendMedia(audioBuffer.subarray(i, i + CHUNK_SIZE));
  }

  connection.sendCloseStream({ type: "CloseStream" });
  await new Promise((resolve) => setTimeout(resolve, 10000));
  connection.close();
}

main().catch(console.error);