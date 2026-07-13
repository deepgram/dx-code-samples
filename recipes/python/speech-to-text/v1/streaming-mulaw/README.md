# G.711 Mu-Law Streaming Transcription

G.711 mu-law (also written μ-law or u-law) is the standard audio codec for North American and Japanese telephony networks. When building voice agents or IVR systems that receive audio from Twilio Media Streams, SIP trunks, or carrier-grade VoIP, audio arrives as 8-bit mu-law samples at 8 kHz. Deepgram can transcribe this format natively — no server-side transcoding required — which eliminates latency and complexity.

This recipe streams mu-law encoded audio over WebSocket to Deepgram's Speech-to-Text v1 API with the correct encoding parameters for telephony audio.

## Key Parameters

| Parameter      | Value   | Description                                      |
|----------------|---------|--------------------------------------------------|
| `encoding`     | `mulaw` | Tells Deepgram the audio is G.711 mu-law encoded |
| `sample_rate`  | `8000`  | Standard telephony sample rate (8 kHz)            |
| `model`        | `nova-3`| Deepgram's latest speech model                   |
| `smart_format` | `True`  | Applies automatic formatting to the transcript    |

## When to Use Mu-Law

- **Twilio Media Streams** — delivers audio as base64-encoded mu-law at 8 kHz
- **SIP trunks / PBX systems** — G.711 μ-law (PCMU) is the default codec
- **Carrier VoIP** — most telecom providers use G.711 as the baseline codec
- **Low-bandwidth links** — mu-law compresses 16-bit PCM to 8 bits (2:1 ratio)

For non-telephony use cases (microphone input, file uploads), `linear16` at 16 kHz+ typically gives better quality.

## Prerequisites

- Python 3.10+
- A [Deepgram API key](https://console.deepgram.com/)
- Install dependencies: `pip install -r ../../requirements.txt`

## Run

```bash
export DEEPGRAM_API_KEY="your-api-key"
python example.py
```

## Expected Output

```
Converted to mu-law: 99837 bytes at 8 kHz
Yeah, as much as, it's fun to float around, you know, you do need
something to push off of. And, I don't think that I could
do a spacewalk. I just don't think I'd like that.
```

The recipe downloads a WAV file, converts it to mu-law at 8 kHz (simulating telephony audio), and streams it for real-time transcription.
