/**
 * Recipe: Sentiment Analysis (Speech-to-Text v1)
 * =================================================
 * Demonstrates the `sentiment` feature, which analyzes sentiment
 * (positive, negative, neutral) for each segment of the transcript.
 *
 * Without sentiment: only the transcript is returned.
 * With sentiment:    a `sentiments` object is added containing per-segment
 *                    sentiment labels and confidence scores.
 *
 * See also: audio-intelligence/v1/sentiment for the standalone version.
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
                      // Adds positive/negative/neutral sentiment per segment.
    // Optional: language="en"
  });

  // Sentiment data path:
  //   response.results.sentiments.segments — array of sentiment segments
  //     segment.text      — the text span
  //     segment.sentiment — "positive", "negative", or "neutral"
  //     segment.sentiment_score — confidence score for the sentiment
  const sentiments = response.results?.sentiments;
  if (sentiments?.segments) {
    for (const segment of sentiments.segments) {
      console.log(`[${segment.sentiment}] ${segment.text}`);
    }
  }
}

main().catch(console.error);