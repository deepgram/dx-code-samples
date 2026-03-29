/**
 * Recipe: Entity Detection (Speech-to-Text v1)
 * ===============================================
 * Demonstrates the `detect_entities` feature, which identifies named
 * entities (people, places, organisations) in the transcript.
 *
 * Without detect_entities: only the transcript is returned.
 * With detect_entities:    an `entities` object is added containing
 *                          detected entities with their types and confidence.
 *
 * See also: audio-intelligence/v1/entities for the standalone version.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    detect_entities: true,  // <-- THIS is the feature this recipe demonstrates.
                            // Identifies named entities in the audio.
    // Optional: language="en"
  });

  // Entities data path:
  //   response.results.entities.segments — array of entity segments
  //     segment.text     — the text span containing the entity
  //     segment.entities — array of { label, value, confidence_score }
  //       label — entity type (e.g., "PER", "ORG", "LOC", "DATE")
  //       value — the detected entity text
  const entities = response.results?.entities;
  if (entities?.segments) {
    for (const segment of entities.segments) {
      for (const entity of segment.entities) {
        console.log(`${entity.label}: ${entity.value} (confidence: ${entity.confidence_score.toFixed(4)})`);
      }
    }
  }
}

main().catch(console.error);