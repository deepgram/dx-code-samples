import { DeepgramClient } from "@deepgram/sdk";

const turns = [], start = Date.now();

function ts(ms) {
  const s = Math.floor(ms / 1000), m = Math.floor(s / 60), h = Math.floor(m / 60);
  return `${String(h).padStart(2,"0")}:${String(m%60).padStart(2,"0")}:${String(s%60).padStart(2,"0")}.${String(ms%1000).padStart(3,"0")}`;
}
function printExports() {
  console.log("=== JSON ===");
  console.log(JSON.stringify({ turns: turns.map(t => ({ role: t.role, content: t.content, timestamp_ms: t.ms })) }, null, 2));
  console.log("\n=== SRT ===");
  turns.forEach((t, i) => { const end = turns[i+1]?.ms ?? t.ms+3000;
    console.log(`${i+1}\n${ts(t.ms).replace(".",",")} --> ${ts(end).replace(".",",")}\n[${t.role}] ${t.content}\n`); });
  console.log("=== WebVTT ===\nWEBVTT\n");
  turns.forEach((t, i) => { const end = turns[i+1]?.ms ?? t.ms+3000;
    console.log(`${ts(t.ms)} --> ${ts(end)}\n<v ${t.role}>${t.content}\n`); });
}
async function main() {
  const client = new DeepgramClient();
  const connection = await client.agent.v1.createConnection();
  connection.on("message", (data) => {
    if (data.type === "ConversationText") {
      const role = data.role === "assistant" ? "Agent" : "User";
      turns.push({ role, content: data.content, ms: Date.now() - start });
      console.log(`${role}: ${data.content}`);
    }
  });
  connection.on("error", (err) => console.error("Error:", err));
  connection.connect();
  await connection.waitForOpen();
  connection.sendSettings({ type: "Settings",
    audio: { input: { encoding: "linear16", sample_rate: 24000 }, output: { encoding: "linear16", sample_rate: 16000, container: "wav" } },
    agent: { language: "en",
      listen: { provider: { type: "deepgram", model: "nova-3" } },
      think: { provider: { type: "open_ai", model: "gpt-4o-mini" }, prompt: "You are a friendly AI assistant. Keep responses brief." },
      speak: { provider: { type: "deepgram", model: "aura-2-thalia-en" } },
      greeting: "Hello! How can I help you today?" },
  });
  const resp = await fetch("https://dpgr.am/spacewalk.wav");
  const buffer = Buffer.from(await resp.arrayBuffer());
  for (let i = 0; i < buffer.length; i += 4096) connection.sendMedia(buffer.subarray(i, i + 4096));
  await new Promise((r) => setTimeout(r, 15000));
  connection.close();
  printExports();
}
main().catch(console.error);
