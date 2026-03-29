/**
 * Recipe: Sentiment Analysis (Audio Intelligence v1)
 * =====================================================
 * Demonstrates segment-level sentiment scoring (positive/negative/neutral).
 *
 * Without sentiment: only the transcript is returned.
 * With sentiment:    a `sentiments` object with per-segment sentiment labels.
 *
 * See also: speech-to-text/v1/sentiment for the STT version.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    sentiment: true,  // <-- THIS is the feature this recipe demonstrates.
  });

  // Sentiment data path:
  //   response.results.sentiments.segments — array of sentiment segments
  //     segment.text, segment.sentiment, segment.sentiment_score
  const sentiments = response.results?.sentiments;
  if (sentiments?.segments) {
    for (const segment of sentiments.segments) {
      console.log(`[${segment.sentiment}] ${segment.text}`);
    }
  }
}

main().catch(console.error);