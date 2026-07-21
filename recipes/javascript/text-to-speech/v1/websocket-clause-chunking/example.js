// Clause-boundary chunked TTS: flush each clause independently to reduce TTFA
import { DeepgramClient } from "@deepgram/sdk";

const FULL_TEXT =
  "Welcome to the demo. We split text at clause boundaries, " +
  "so audio arrives sooner; each clause is flushed independently, " +
  "and you hear speech before the full message is synthesized.";

function splitClauses(text) {
  return text.split(/(?<=[,;:\u2014])\s+|(?<=\.)\s+/).filter(Boolean);
}

async function main() {
  const client = new DeepgramClient();
  const connection = await client.speak.v1.createConnection({
    model: "aura-2-thalia-en",
    encoding: "linear16",
  });

  let totalBytes = 0, flushCount = 0;
  const clauses = splitClauses(FULL_TEXT);

  connection.on("message", (data) => {
    if (data instanceof ArrayBuffer || Buffer.isBuffer(data)) {
      totalBytes += data instanceof ArrayBuffer ? data.byteLength : data.length;
    } else if (data.type === "Flushed") {
      flushCount++;
      console.log(`Clause ${flushCount}/${clauses.length} flushed (${totalBytes} bytes so far)`);
      if (flushCount >= clauses.length) setTimeout(() => connection.close(), 1000);
    }
  });
  connection.on("error", (err) => console.error("Error:", err));

  connection.connect();
  await connection.waitForOpen();

  for (const clause of clauses) {
    connection.sendText({ type: "Speak", text: clause + " " });
    connection.sendFlush({ type: "Flush" });
  }

  await new Promise((resolve) => setTimeout(resolve, 30000));
  connection.close();
}

main().catch(console.error);
