/**
 * Recipe: Search (Speech-to-Text v1)
 * =====================================
 * Demonstrates the `search` feature, which finds specific words or phrases
 * in the audio and returns their locations with confidence scores.
 *
 * Without search: standard transcript only.
 * With search:    a `search` array is added to the channel data containing
 *                 matches with timing and confidence for each search term.
 *
 * This is useful for finding key moments in long recordings.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    search: ["spacewalk", "anniversary"],  // <-- THIS is the feature this recipe demonstrates.
                                            // Searches for these terms in the audio.
    // Pass an array of strings to search for multiple terms
  });

  // Search results data path:
  //   response.results.channels[0].search — array of search result groups
  //     group.query — the search term
  //     group.hits  — array of { confidence, start, end, snippet }
  const searchResults = response.results?.channels?.[0]?.search;
  if (searchResults) {
    for (const result of searchResults) {
      console.log(`Search term: "${result.query}"`);
      for (const hit of result.hits) {
        console.log(`  Found at ${hit.start.toFixed(2)}s (confidence: ${hit.confidence.toFixed(4)}): "${hit.snippet}"`);
      }
    }
  }
}

main().catch(console.error);