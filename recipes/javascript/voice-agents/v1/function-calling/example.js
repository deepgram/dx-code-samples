/**
 * Recipe: Function Calling (Voice Agents v1)
 * =============================================
 * Demonstrates injecting tool calls for the LLM to use during conversation.
 *
 * Function calling allows the agent to invoke predefined tools (functions)
 * when it needs to perform actions like looking up data, making API calls,
 * or executing commands. The LLM decides when to call functions based on
 * the conversation context.
 *
 * This recipe uses InjectAgentMessage and InjectUserMessage to simulate
 * a conversation with function-calling context.
 *
 * See also: voice-agents/v1/connect for basic setup.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const connection = await client.agent.v1.createConnection();

  connection.on("message", (data) => {
    if (data.type === "SettingsApplied") {
      console.log("Settings applied with function calling");
      // Inject a user message to trigger a response
      connection.sendInjectUserMessage({
        type: "InjectUserMessage",
        content: "What is the weather like today?",  // field MUST be `content`
      });
    } else if (data.type === "ConversationText") {
      const role = data.role === "assistant" ? "Agent" : "User";
      console.log(`${role}: ${data.content}`);
    } else if (data.type === "FunctionCallRequest") {
      console.log("Function call requested:", JSON.stringify(data));
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
        prompt: "You are a helpful assistant. Keep responses brief.",
      },
      speak: { provider: { type: "deepgram", model: "aura-2-thalia-en" } },
    },
  });

  await new Promise((resolve) => setTimeout(resolve, 15000));
  connection.close();
}

main().catch(console.error);