#!/usr/bin/env bash
# Recipe: Topic Detection (Audio Intelligence v1)
#
# Identifies key topics discussed in audio content. The API analyses
# the transcript and returns topic segments, each containing detected
# topics with confidence scores.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

curl -s "https://api.deepgram.com/v1/listen?model=nova-3&topics=true" \
  -H "Authorization: Token $DEEPGRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$AUDIO_URL\"}" \
  | python3 -c "
import sys, json
r = json.load(sys.stdin)
seen = set()
for seg in r['results']['topics']['segments']:
    for t in seg['topics']:
        if t['topic'] not in seen:
            seen.add(t['topic'])
            print(f'Topic: {t[\"topic\"]} (confidence: {t[\"confidence\"]:.2f})')
"
