/**
 * Recipe: Keyword Boosting (Speech-to-Text v1)
 * ===============================================
 * Demonstrates the `keywords` feature, which boosts recognition accuracy
 * for specific words or phrases (proper nouns, jargon, etc.).
 *
 * Without keywords: the model uses default vocabulary weighting.
 * With keywords:    specified terms get higher recognition priority,
 *                   improving accuracy for domain-specific vocabulary.
 *
 * Format: "term:boost" where boost is a float (default 1.5).
 * Higher boost = stronger preference for that term.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    keywords: ["spacewalk:2", "Leonov:1.5"],  // <-- THIS is the feature this recipe demonstrates.
                                                // Boosts accuracy for these specific terms.
    // Format: "term:boost_value" — higher values = stronger boost
    // Optional: keyterm=["term1", "term2"] (alternative for Nova-3)
  });

  // The transcript at channels[0].alternatives[0].transcript will have
  // improved accuracy for the boosted keywords.
  const transcript = response.results?.channels?.[0]?.alternatives?.[0]?.transcript;
  if (transcript) {
    console.log(transcript);
  }
}

main().catch(console.error);