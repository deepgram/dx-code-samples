/**
 * Recipe: Intent Recognition (Audio Intelligence v1)
 * =====================================================
 * Demonstrates detecting caller/speaker intents from context.
 *
 * Without intents: only the transcript is returned.
 * With intents:    an `intents` object with detected intents per segment.
 *
 * See also: speech-to-text/v1/intents for the STT version.
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
  });

  // Intents data path:
  //   response.results.intents.segments[].intents[] — { intent, confidence_score }
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