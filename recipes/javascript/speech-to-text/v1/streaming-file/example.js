/**
 * Recipe: Stream Audio File for Transcription (Speech-to-Text v1)
 * =================================================================
 * Demonstrates streaming a local audio file over WebSocket for transcription.
 *
 * Unlike the REST API (transcribe-file), this uses WebSocket streaming which
 * returns results incrementally as the audio is processed. Useful for large
 * files where you want partial results before the entire file is processed.
 *
 * See also: speech-to-text/v1/streaming for live microphone streaming.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const resp = await fetch(AUDIO_URL);
  const audioBuffer = Buffer.from(await resp.arrayBuffer());

  const connection = await client.listen.v1.createConnection({
    model: "nova-3",
    smart_format: "true",
    // Optional: punctuate, diarize, utterances, language, interim_results
  });

  const transcripts = [];
  connection.on("message", (data) => {
    if (data.type === "Results" && data.is_final) {
      const transcript = data.channel?.alternatives?.[0]?.transcript;
      if (transcript) {
        transcripts.push(transcript);
      }
    }
  });

  connection.on("error", (err) => console.error("Error:", err));

  connection.connect();
  await connection.waitForOpen();

  const CHUNK_SIZE = 4096;
  for (let i = 0; i < audioBuffer.length; i += CHUNK_SIZE) {
    connection.sendMedia(audioBuffer.subarray(i, i + CHUNK_SIZE));
  }

  connection.sendFinalize({ type: "Finalize" });
  await new Promise((resolve) => setTimeout(resolve, 5000));
  connection.close();

  console.log(transcripts.join(" "));
}

main().catch(console.error);