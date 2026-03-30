#!/usr/bin/env bash
# Recipe: Speaker Diarization (Speech-to-Text v1)
#
# Assigns a numeric speaker label (0, 1, 2, …) to each word in the
# transcript. This lets you see who said what in multi-speaker audio.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

curl -s "https://api.deepgram.com/v1/listen?model=nova-3&diarize=true&smart_format=true" \
  -H "Authorization: Token $DEEPGRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$AUDIO_URL\"}" \
  | python3 -c "
import sys, json
r = json.load(sys.stdin)
words = r['results']['channels'][0]['alternatives'][0]['words']
current = None
for w in words:
    spk = w.get('speaker', 0)
    if spk != current:
        if current is not None:
            print()
        current = spk
        print(f'[Speaker {spk}]', end=' ')
    print(w['word'], end=' ')
print()
"
