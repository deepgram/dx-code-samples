# Bit Rate Control — Text-to-Speech v1

The bit rate parameter controls the output audio bit rate for compressed encodings like mp3. Lower bit rates produce smaller files suitable for bandwidth-constrained environments, while higher bit rates preserve more audio quality.

Common mp3 bit rate values:
- **32000** — low quality, very small files
- **48000** — medium quality, good for voice
- **128000** — high quality (default)
- **192000** — very high quality

## Key parameters

| Parameter | Type | Description |
|---|---|---|
| `bit_rate` | `number` | Output audio bit rate in bits per second |
| `encoding` | `string` | Audio encoding (must be a compressed format like `mp3`) |
| `model` | `string` | Voice model (e.g., `aura-2-thalia-en`) |

## Sample output

```
Saved output.mp3 (12345 bytes) — encoding: mp3, bit_rate: 48000
```

## Prerequisites

- Node.js 20+
- A [Deepgram API key](https://console.deepgram.com/signup?jump=keys)

## Run

```bash
export DEEPGRAM_API_KEY="your-api-key"
npm install
node example.js
```
