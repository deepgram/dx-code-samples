import { DeepgramClient } from "@deepgram/sdk";

const tools = [
  { name: "get_weather", description: "Get weather for a city", parameters: { type: "object", properties: { city: { type: "string" } }, required: ["city"] } },
  { name: "get_time", description: "Get current time in a timezone", parameters: { type: "object", properties: { timezone: { type: "string" } }, required: ["timezone"] } },
  { name: "get_population", description: "Get population of a city", parameters: { type: "object", properties: { city: { type: "string" } }, required: ["city"] } },
];
const handlers = {
  get_weather: ({ city }) => `${city}: 72°F, sunny`,
  get_time: ({ timezone }) => `Current time in ${timezone}: 2:30 PM`,
  get_population: ({ city }) => `${city} population: 8.3 million`,
};

async function main() {
  const client = new DeepgramClient();
  const connection = await client.agent.v1.createConnection();
  connection.on("message", async (data) => {
    if (data.type === "SettingsApplied") {
      console.log("Settings applied with 3 tools registered");
      connection.sendInjectUserMessage({ type: "InjectUserMessage", content: "What's the weather, time, and population in New York?" });
    } else if (data.type === "FunctionCallRequest") {
      console.log(`Parallel call: ${data.functions.length} function(s) requested`);
      const results = await Promise.all(data.functions.map(async (fn) => {
        const args = JSON.parse(fn.arguments);
        const result = handlers[fn.name]?.(args) ?? "Unknown tool";
        console.log(`  ${fn.name}(${JSON.stringify(args)}) -> ${result}`);
        return { id: fn.id, name: fn.name, content: result };
      }));
      results.forEach((r) => connection.sendFunctionCallResponse({ type: "FunctionCallResponse", ...r }));
    } else if (data.type === "ConversationText") {
      console.log(`${data.role === "assistant" ? "Agent" : "User"}: ${data.content}`);
    }
  });
  connection.on("error", (err) => console.error("Error:", err));
  connection.connect();
  await connection.waitForOpen();
  connection.sendSettings({
    type: "Settings",
    audio: { input: { encoding: "linear16", sample_rate: 24000 }, output: { encoding: "linear16", sample_rate: 16000, container: "wav" } },
    agent: {
      language: "en",
      listen: { provider: { type: "deepgram", model: "nova-3" } },
      think: { provider: { type: "open_ai", model: "gpt-4o-mini" }, prompt: "You are a helpful assistant. Use all available tools in parallel when the user asks about multiple things.", functions: tools },
      speak: { provider: { type: "deepgram", model: "aura-2-thalia-en" } },
    },
  });
  await new Promise((resolve) => setTimeout(resolve, 20000));
  connection.close();
}
main().catch(console.error);
