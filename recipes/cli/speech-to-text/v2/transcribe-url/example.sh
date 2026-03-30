#!/usr/bin/env bash
# Recipe: Transcribe Audio from URL — v2 API (Speech-to-Text v2)
#
# Uses the v2 listen endpoint with the flux-general-en model, which is
# optimised for English-only high-accuracy transcription. The v2 API
# returns results in a slightly different format than v1.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

curl -s "https://api.deepgram.com/v2/listen?model=flux-general-en&smart_format=true" \
  -H "Authorization: Token $DEEPGRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$AUDIO_URL\"}" \
  | python3 -c "
import sys, json
r = json.load(sys.stdin)
print(r['results']['channels'][0]['alternatives'][0]['transcript'])
"
