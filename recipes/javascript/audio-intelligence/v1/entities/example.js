/**
 * Recipe: Entity Detection (Audio Intelligence v1)
 * ====================================================
 * Demonstrates identifying named entities: people, organisations, locations.
 *
 * Without detect_entities: only the transcript is returned.
 * With detect_entities:    an `entities` object with detected entities.
 *
 * See also: speech-to-text/v1/detect-entities for the STT version.
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
  });

  // Entities data path:
  //   response.results.entities.segments[].entities[] — { label, value, confidence_score }
  //     label: "PER" (person), "ORG" (org), "LOC" (location), "DATE", etc.
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