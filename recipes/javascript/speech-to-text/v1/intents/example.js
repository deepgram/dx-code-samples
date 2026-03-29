/**
 * Recipe: Intent Recognition (Speech-to-Text v1)
 * =================================================
 * Demonstrates the `intents` feature, which detects speaker intents
 * in the transcript.
 *
 * Without intents: only the transcript is returned.
 * With intents:    an `intents` object is added containing detected intents
 *                  with confidence scores for each text segment.
 *
 * See also: audio-intelligence/v1/intents for the standalone version.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    intents: true,  // <-- THIS is the feature this recipe demonstrates.
                    // Detects speaker intents from the audio context.
    // Optional: custom_intent="request_information", custom_intent_mode="extended"
  });

  // Intents data path:
  //   response.results.intents.segments — array of intent segments
  //     segment.text    — the text span
  //     segment.intents — array of { intent, confidence_score }
  // Intents may not be detected in all audio clips.
  const intents = response.results?.intents;
  if (intents?.segments) {
    for (const segment of intents.segments) {
      for (const intent of segment.intents) {
        console.log(`Intent: ${intent.intent} (confidence: ${intent.confidence_score.toFixed(4)})`);
      }
      console.log(`  Text: "${segment.text}"`);
    }
  }
}

main().catch(console.error);