/**
 * Recipe: Configure TTS Voice (Voice Agents v1)
 * =================================================
 * Demonstrates choosing a specific aura-2 voice model for agent speech.
 *
 * Available Deepgram voices: aura-2-thalia-en, aura-2-arcas-en,
 * aura-2-luna-en, aura-2-orion-en, aura-2-perseus-en, etc.
 * External TTS providers: eleven_labs, cartesia, open_ai, aws_polly.
 *
 * See also: voice-agents/v1/connect for basic setup,
 *           voice-agents/v1/custom-llm for LLM configuration.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const connection = await client.agent.v1.createConnection();

  connection.on("message", (data) => {
    if (data.type === "SettingsApplied") {
      console.log("Settings applied with custom TTS voice");
    } else if (data.type === "ConversationText") {
      const role = data.role === "assistant" ? "Agent" : "User";
      console.log(`${role}: ${data.content}`);
    }
  });

  connection.on("error", (err) => console.error("Error:", err));

  connection.connect();
  await connection.waitForOpen();

  connection.sendSettings({
    type: "Settings",
    audio: {
      input: { encoding: "linear16", sample_rate: 24000 },
      output: { encoding: "linear16", sample_rate: 16000, container: "wav" },
    },
    agent: {
      language: "en",
      listen: { provider: { type: "deepgram", model: "nova-3" } },
      think: {
        provider: { type: "open_ai", model: "gpt-4o-mini" },
        prompt: "You are a friendly AI assistant.",
      },
      speak: {
        provider: {
          type: "deepgram",
          model: "aura-2-arcas-en",  // <-- THIS selects the TTS voice.
                                      // Try: thalia, luna, orion, perseus
        },
      },
    },
  });

  const resp = await fetch(AUDIO_URL);
  const buffer = Buffer.from(await resp.arrayBuffer());
  const CHUNK = 4096;
  for (let i = 0; i < buffer.length; i += CHUNK) {
    connection.sendMedia(buffer.subarray(i, i + CHUNK));
  }

  await new Promise((resolve) => setTimeout(resolve, 15000));
  connection.close();
}

main().catch(console.error);