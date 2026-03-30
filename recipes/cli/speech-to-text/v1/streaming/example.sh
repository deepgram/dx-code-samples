#!/usr/bin/env bash
# Recipe: Live Streaming Transcription (Speech-to-Text v1)
#
# Opens a WebSocket connection to Deepgram's live transcription endpoint
# and streams audio from a URL. Uses websocat for the WebSocket connection
# and curl to fetch the audio data. Prints transcript lines as they arrive.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

curl -sL "$AUDIO_URL" \
  | websocat -n -B 65536 \
    "wss://api.deepgram.com/v1/listen?model=nova-3&smart_format=true&encoding=linear16&sample_rate=8000" \
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
