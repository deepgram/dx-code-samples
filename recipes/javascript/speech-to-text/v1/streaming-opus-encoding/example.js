/** Stream Opus-encoded audio over WebSocket for 10-20x bandwidth savings. */

import { DeepgramClient } from "@deepgram/sdk";
import { execSync } from "node:child_process";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();
  const resp = await fetch(AUDIO_URL);
  const wavBuffer = Buffer.from(await resp.arrayBuffer());
  const opusBuffer = execSync(
    "ffmpeg -i pipe:0 -c:a libopus -ar 48000 -ac 1 -f opus pipe:1",
    { input: wavBuffer, maxBuffer: 50 * 1024 * 1024 },
  );
  console.log(`PCM: ${wavBuffer.length} bytes → Opus: ${opusBuffer.length} bytes (${(wavBuffer.length / opusBuffer.length).toFixed(1)}x smaller)`);

  const connection = await client.listen.v1.createConnection({
    model: "nova-3",
    encoding: "opus",
    sample_rate: "48000",
    smart_format: "true",
  });

  const transcripts = [];
  connection.on("message", (data) => {
    if (data.type === "Results" && data.is_final) {
      const txt = data.channel?.alternatives?.[0]?.transcript;
      if (txt) transcripts.push(txt);
    }
  });
  connection.on("error", (err) => console.error("Error:", err));

  connection.connect();
  await connection.waitForOpen();

  const CHUNK = 4096;
  for (let i = 0; i < opusBuffer.length; i += CHUNK) {
    connection.sendMedia(opusBuffer.subarray(i, i + CHUNK));
  }

  connection.sendFinalize({ type: "Finalize" });
  await new Promise((r) => setTimeout(r, 5000));
  connection.close();
  console.log(transcripts.join(" "));
}

main().catch(console.error);
