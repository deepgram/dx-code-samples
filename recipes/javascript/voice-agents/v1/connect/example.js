/**
 * Recipe: Connect to Voice Agent (Voice Agents v1)
 * ===================================================
 * Demonstrates establishing a WebSocket voice agent session with default
 * settings. The agent uses a listen-think-speak pipeline:
 * - Listen: Deepgram Nova-3 for speech recognition
 * - Think:  OpenAI GPT-4o-mini for conversation logic
 * - Speak:  Deepgram Aura-2 for text-to-speech
 *
 * This recipe sends audio from a file to simulate user speech.
 * In production, stream microphone audio instead.
 *
 * See also: voice-agents/v1/custom-llm, voice-agents/v1/custom-tts
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const connection = await client.agent.v1.createConnection();

  connection.on("message", (data) => {
    if (data.type === "SettingsApplied") {
      console.log("Settings applied");
    } else if (data.type === "ConversationText") {
      const role = data.role === "assistant" ? "Agent" : "User";
      console.log(`${role}: ${data.content}`);
    } else if (data.type === "AgentStartedSpeaking") {
      console.log("Agent started speaking");
    }
  });

  connection.on("error", (err) => console.error("Error:", err));

  connection.connect();
  await connection.waitForOpen();

  // Configure the agent pipeline
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
        prompt: "You are a friendly AI assistant. Keep responses brief.",
      },
      speak: { provider: { type: "deepgram", model: "aura-2-thalia-en" } },
      greeting: "Hello! How can I help you today?",
    },
  });

  // Send audio data
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