/**
 * Recipe: Transcribe Audio from URL (Speech-to-Text v1)
 * ======================================================
 * Demonstrates the most basic pre-recorded transcription: send a URL
 * pointing to a hosted audio file, get back a text transcript.
 *
 * This is the foundation recipe. All other STT recipes build on this
 * pattern by adding feature flags (see: paragraphs, diarize, smart-format,
 * etc. in sibling directories).
 */

import { DeepgramClient } from "@deepgram/sdk";

// Demo audio — a short spacewalk news segment hosted by Deepgram.
// Any publicly accessible audio URL works (mp3, wav, flac, ogg, etc.)
const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  // DeepgramClient() with no args reads DEEPGRAM_API_KEY from environment.
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",       // nova-3 is the highest-accuracy model
    smart_format: true,    // formats numbers, dates, currencies automatically
    // Other useful params: language, punctuate, paragraphs, diarize
  });

  // response.results.channels[0].alternatives[0].transcript
  //   channels[0]      — first audio channel (use multichannel for multi-track)
  //   alternatives[0]  — highest-confidence transcript
  const transcript = response.results?.channels?.[0]?.alternatives?.[0]?.transcript;
  if (transcript) {
    console.log(transcript);
  }
}

main().catch(console.error);