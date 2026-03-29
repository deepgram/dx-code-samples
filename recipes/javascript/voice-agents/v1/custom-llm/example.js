/**
 * Recipe: Configure LLM Provider (Voice Agents v1)
 * ====================================================
 * Demonstrates using a different LLM provider (e.g., Anthropic, Google)
 * as the "think" model for the voice agent.
 *
 * Available think providers: open_ai, anthropic, google, groq, aws_bedrock
 * Each provider requires its API key configured in the Deepgram dashboard.
 *
 * See also: voice-agents/v1/connect for basic setup,
 *           voice-agents/v1/custom-tts for TTS configuration.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const connection = await client.agent.v1.createConnection();

  connection.on("message", (data) => {
    if (data.type === "SettingsApplied") {
      console.log("Settings applied with custom LLM");
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
        provider: {
          type: "open_ai",          // <-- THIS selects the LLM provider.
          model: "gpt-4o-mini",     // Try: "anthropic" + "claude-3-5-sonnet-20241022"
        },
        prompt: "You are a concise and helpful AI assistant.",
      },
      speak: { provider: { type: "deepgram", model: "aura-2-thalia-en" } },
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