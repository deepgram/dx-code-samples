/**
 * Recipe: Select Voice Model (Text-to-Speech v1)
 * ==================================================
 * Demonstrates choosing from available aura-2 voice models.
 *
 * Different models have different voice characteristics (pitch, tone, accent).
 * Available aura-2 voices include: thalia, arcas, luna, orion, perseus, etc.
 * The model name format is: aura-2-{voice}-{language}
 *
 * See also: text-to-speech/v1/generate-audio for the default voice,
 *           text-to-speech/v1/select-encoding for encoding options.
 */

import { DeepgramClient } from "@deepgram/sdk";

async function main() {
  const client = new DeepgramClient();

  const response = await client.speak.v1.audio.generate({
    text: "Hello! This is the Arcas voice model from Deepgram.",
    model: "aura-2-arcas-en",  // <-- THIS selects the voice. Try: thalia, luna, orion, perseus
    encoding: "linear16",
    container: "wav",
  });

  const stream = response.stream();
  const reader = stream.getReader();
  let totalBytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.length;
  }

  console.log(`Generated audio with aura-2-arcas-en: ${totalBytes} bytes`);
}

main().catch(console.error);