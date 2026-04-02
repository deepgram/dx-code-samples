/**
 * Recipe: Text Summarization (Text Analysis v1)
 * ================================================
 * Demonstrates the `summarize` feature on Deepgram's text analysis API,
 * which generates a concise summary from plain text input.
 *
 * Text analysis (Read API) works directly on text — no audio required.
 * The summarize parameter accepts "v2" to enable the summarization engine.
 */

import { DeepgramClient } from "@deepgram/sdk";

const TEXT =
  "Deepgram is an AI speech company that provides automatic speech recognition " +
  "and text-to-speech APIs. Their Nova-3 model offers state-of-the-art accuracy " +
  "for transcription. The company also provides audio intelligence features like " +
  "sentiment analysis, topic detection, and intent recognition. Developers can " +
  "integrate Deepgram into their applications using SDKs for Python, JavaScript, " +
  "Go, .NET, and other languages.";

async function main() {
  const client = new DeepgramClient();

  const response = await client.read.v1.text.analyze({
    text: TEXT,
    language: "en",
    summarize: "v2",  // <-- THIS enables text summarization.
  });

  const summary = response.results?.summary;
  if (summary) {
    console.log(`Summary: ${summary.text}`);
  }
}

main().catch(console.error);
