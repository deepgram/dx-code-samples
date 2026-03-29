/**
 * Recipe: Topic Detection (Audio Intelligence v1)
 * ==================================================
 * Demonstrates identifying key topics discussed in audio.
 *
 * Without topics: only the transcript is returned.
 * With topics:    a `topics` object with detected topics and confidence scores.
 *
 * See also: speech-to-text/v1/topics for the STT version.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    topics: true,  // <-- THIS is the feature this recipe demonstrates.
  });

  // Topics data path:
  //   response.results.topics.segments[].topics[] — { topic, confidence_score }
  const topics = response.results?.topics;
  if (topics?.segments) {
    for (const segment of topics.segments) {
      for (const topic of segment.topics) {
        console.log(`Topic: ${topic.topic} (confidence: ${topic.confidence_score.toFixed(4)})`);
      }
    }
  }
}

main().catch(console.error);