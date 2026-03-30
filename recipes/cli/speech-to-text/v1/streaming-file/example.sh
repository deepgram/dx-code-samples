#!/usr/bin/env bash
# Recipe: Stream Audio File for Transcription (Speech-to-Text v1)
#
# Downloads an audio file locally, then streams it over a WebSocket
# connection to Deepgram for real-time transcription. This demonstrates
# the file-streaming pattern (as opposed to microphone streaming).

AUDIO_URL="https://dpgr.am/spacewalk.wav"
AUDIO_FILE="/tmp/spacewalk_stream.wav"

curl -sL "$AUDIO_URL" -o "$AUDIO_FILE"

cat "$AUDIO_FILE" \
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

rm -f "$AUDIO_FILE"
