/**
 * Recipe: Greeting & Persona Configuration (Voice Agents v1)
 * ============================================================
 * Configures a voice agent with a custom greeting message and persona
 * constraints. The greeting plays on connection, and the system prompt
 * defines the agent's name, role, tone, and topic boundaries so it
 * stays in character and refuses off-topic requests gracefully.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

const PERSONA_PROMPT = `You are Sarah, a friendly customer support agent for Acme Corp.
Rules:
- Always introduce yourself as Sarah if asked your name.
- Keep answers brief (1-2 sentences).
- Only discuss Acme products, orders, and account questions.
- If asked about unrelated topics, politely redirect: "I can only help with Acme-related questions."
- Use a warm, professional tone. Never use slang.`;

async function main() {
  const client = new DeepgramClient();
  const connection = await client.agent.v1.createConnection();

  connection.on("message", (data) => {
    if (data.type === "SettingsApplied") {
      console.log("Settings applied — persona active");
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

  connection.sendSettings({
    type: "Settings",
    audio: {
      input: { encoding: "linear16", sample_rate: 24000 },
      output: { encoding: "linear16", sample_rate: 16000, container: "wav" },
    },
    agent: {
      language: "en",
      listen: { provider: { type: "deepgram", model: "nova-3" } },
      think: { provider: { type: "open_ai", model: "gpt-4o-mini" }, prompt: PERSONA_PROMPT },
      speak: { provider: { type: "deepgram", model: "aura-2-thalia-en" } },
      greeting: "Hi, I'm Sarah from Acme Support. How can I help you today?",
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
