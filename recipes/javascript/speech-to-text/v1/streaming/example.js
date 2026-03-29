/**
 * Recipe: Live Streaming Transcription (Speech-to-Text v1)
 * ==========================================================
 * Demonstrates WebSocket-based real-time transcription from an audio source.
 *
 * This recipe streams a pre-recorded file over WebSocket to simulate live audio.
 * In production, replace the file stream with microphone or other live input.
 *
 * The WebSocket returns interim (partial) and final results as audio is received.
 * See also: speech-to-text/v1/streaming-file for a simpler file-streaming example.
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
    interim_results: "true",  // <-- enables partial results as audio streams in
    // Optional: punctuate, diarize, utterances, language
  });

  connection.on("message", (data) => {
    // data.type === "Results" for transcription results
    //   data.channel.alternatives[0].transcript — the transcript text
    //   data.is_final   — true when this segment is finalized
    //   data.speech_final — true when speaker has finished a natural utterance
    if (data.type === "Results" && data.is_final) {
      const transcript = data.channel?.alternatives?.[0]?.transcript;
      if (transcript) {
        console.log(transcript);
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
}

main().catch(console.error);