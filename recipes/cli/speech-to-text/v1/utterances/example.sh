#!/usr/bin/env bash
# Recipe: Utterances (Speech-to-Text v1)
#
# Splits the transcript into per-utterance segments, each with start/end
# timing. An utterance is a continuous stretch of speech separated by
# pauses — useful for building subtitle tracks or turn-based dialogue.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

curl -s "https://api.deepgram.com/v1/listen?model=nova-3&utterances=true" \
  -H "Authorization: Token $DEEPGRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$AUDIO_URL\"}" \
  | python3 -c "
import sys, json
r = json.load(sys.stdin)
for u in r['results']['utterances']:
    print(f'[{u[\"start\"]:.2f}s - {u[\"end\"]:.2f}s] {u[\"transcript\"]}')
"
