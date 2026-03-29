/**
 * Recipe: Paragraphs (Speech-to-Text v1)
 * ========================================
 * Demonstrates the `paragraphs` feature, which groups the transcript
 * into paragraph blocks based on natural speech pauses.
 *
 * Without paragraphs: a flat transcript string.
 * With paragraphs:    structured paragraph objects with sentence-level detail.
 *
 * The paragraph data lives in the alternatives' `paragraphs` field, not in
 * the top-level transcript string.
 * See also: speech-to-text/v1/utterances for speaker-turn-based segmentation.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    paragraphs: true,  // <-- THIS is the feature this recipe demonstrates.
                       // Groups transcript into paragraph blocks.
    // Optional: punctuate=true (included in smart_format), utterances=true
  });

  // Paragraph data path:
  //   response.results.channels[0].alternatives[0].paragraphs.paragraphs
  //     para.sentences       — list of sentence objects
  //       sentence.text      — the sentence string
  //       sentence.start/end — timing in seconds
  // Paragraphs may be absent if audio is too short for paragraph detection.
  const alt = response.results?.channels?.[0]?.alternatives?.[0];
  const paragraphs = alt?.paragraphs?.paragraphs;
  if (paragraphs) {
    for (const para of paragraphs) {
      const text = para.sentences.map((s) => s.text).join(" ");
      console.log(text);
      console.log();
    }
  }
}

main().catch(console.error);