#!/usr/bin/env bash
# Recipe: Live Streaming Transcription — v2 API (Speech-to-Text v2)
#
# Opens a WebSocket to the v2/listen endpoint using the flux-general-en
# model for high-accuracy English streaming transcription. Streams audio
# from a demo file and prints transcript lines as they arrive.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

curl -sL "$AUDIO_URL" \
  | websocat -n -B 65536 \
    "wss://api.deepgram.com/v2/listen?model=flux-general-en&smart_format=true&encoding=linear16&sample_rate=8000" \
    --header "Authorization: Token $DEEPGRAM_API_KEY" \
  | python3 -c "
import sys, json
for line in sys.stdin:
    line = line.strip()
    if not line:
        continue
    msg = json.loads(line)
    if msg.get('type') == 'Results':
        transcript = msg['channel']['alternatives'][0]['transcript']
        if transcript:
            print(transcript)
"
