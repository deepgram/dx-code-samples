/**
 * Recipe: Transcribe Local Audio File (Speech-to-Text v1)
 * ========================================================
 * Demonstrates transcription of a local audio file by streaming it to
 * Deepgram's REST API.
 *
 * Unlike transcribe-url (which sends a URL for Deepgram to fetch),
 * this recipe reads a local file and uploads its bytes directly.
 * Use this when your audio is not publicly hosted.
 *
 * See also: speech-to-text/v1/transcribe-url for URL-based transcription.
 */

import { DeepgramClient } from "@deepgram/sdk";
import { createReadStream } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const client = new DeepgramClient();

  // For this demo we download the standard sample file first.
  // In production, point to any local audio file (wav, mp3, flac, ogg, etc.)
  const audioUrl = "https://dpgr.am/spacewalk.wav";
  const resp = await fetch(audioUrl);
  const buffer = Buffer.from(await resp.arrayBuffer());

  const response = await client.listen.v1.media.transcribeFile(buffer, {
    model: "nova-3",
    smart_format: true,
    // Other useful params: language, punctuate, paragraphs, diarize
  });

  // response.results.channels[0].alternatives[0].transcript
  const transcript = response.results?.channels?.[0]?.alternatives?.[0]?.transcript;
  if (transcript) {
    console.log(transcript);
  }
}

main().catch(console.error);