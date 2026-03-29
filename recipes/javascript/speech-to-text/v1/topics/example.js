/**
 * Recipe: Topic Detection (Speech-to-Text v1)
 * ==============================================
 * Demonstrates the `topics` feature, which identifies the main topics
 * discussed in the audio.
 *
 * Without topics: only the transcript is returned.
 * With topics:    a `topics` object is added containing detected topics
 *                 with confidence scores.
 *
 * See also: audio-intelligence/v1/topics for the standalone version.
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
                   // Detects topics discussed in the audio.
    // Optional: custom_topic="space exploration", custom_topic_mode="extended"
  });

  // Topics data path:
  //   response.results.topics.segments — array of topic segments
  //     segment.text      — the text span
  //     segment.topics    — array of { topic, confidence_score }
  // Topics may not be detected in very short audio clips.
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