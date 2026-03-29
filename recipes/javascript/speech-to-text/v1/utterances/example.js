/**
 * Recipe: Utterances (Speech-to-Text v1)
 * ========================================
 * Demonstrates the `utterances` feature, which splits the transcript
 * into per-utterance segments with start/end timing.
 *
 * Without utterances: a single transcript string.
 * With utterances:    an array of utterance objects, each with text and timing.
 *
 * Utterances are split based on pauses in speech. Combine with diarize
 * for speaker-attributed utterances.
 * See also: speech-to-text/v1/paragraphs for paragraph-level grouping.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    utterances: true,  // <-- THIS is the feature this recipe demonstrates.
                       // Splits transcript into timed utterance segments.
    // Optional: utt_split=0.8 (pause threshold in seconds), diarize=true
  });

  // Utterance data path:
  //   response.results.utterances — array of utterance objects
  //     utterance.transcript — the text of this utterance
  //     utterance.start      — start time in seconds
  //     utterance.end        — end time in seconds
  //     utterance.confidence — confidence score 0-1
  //     utterance.speaker    — speaker index (only when diarize=true)
  const utterances = response.results?.utterances;
  if (utterances) {
    for (const utt of utterances) {
      console.log(`[${utt.start.toFixed(2)}s - ${utt.end.toFixed(2)}s] ${utt.transcript}`);
    }
  }
}

main().catch(console.error);