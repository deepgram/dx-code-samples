/**
 * Recipe: Speaker Diarization (Speech-to-Text v1)
 * ==================================================
 * Demonstrates the `diarize` feature, which assigns a numeric speaker
 * label (0, 1, 2, ...) to each word in the transcript.
 *
 * Without diarize: words have no speaker attribution.
 * With diarize:    each word object has a `speaker` field (int).
 *
 * Speaker 0 is the first speaker detected, Speaker 1 the second, etc.
 * Labels are consistent within a single request but not across requests.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    diarize: true,  // <-- THIS is the feature this recipe demonstrates.
                    // Adds a `speaker` integer field to every word object.
    // Optional: utterances=true (speaker-attributed utterances)
  });

  // Word-level speaker data path:
  //   response.results.channels[0].alternatives[0].words
  //     word.word       — the spoken word (string)
  //     word.speaker    — speaker index (int), only present with diarize=true
  //     word.start/end  — timing in seconds
  //     word.confidence — confidence score 0-1
  const words = response.results?.channels?.[0]?.alternatives?.[0]?.words;
  if (words) {
    let currentSpeaker = null;
    for (const word of words) {
      if (word.speaker !== currentSpeaker) {
        currentSpeaker = word.speaker;
        process.stdout.write(`\n[Speaker ${currentSpeaker}] `);
      }
      process.stdout.write(`${word.word} `);
    }
    console.log();
  }
}

main().catch(console.error);