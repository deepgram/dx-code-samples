#!/usr/bin/env bash
# Recipe: Intent Recognition (Audio Intelligence v1)
#
# Detects speaker intents — the goals or purposes behind what is
# being said. Each segment is returned with one or more intents
# and a confidence score.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg listen "$AUDIO_URL" \
  --model nova-3 \
  --intents \
  -o json \
  | python3 -c "
import sys, json
r = json.load(sys.stdin)
transcript = r['results']['channels'][0]['alternatives'][0]['transcript']
print(transcript[:200])

segments = r.get('results', {}).get('intents', {}).get('segments', [])
found = False
for seg in segments:
    for i in seg.get('intents', []):
        if not found:
            print()
            print('Intents:')
            found = True
        label = i.get('intent', 'unknown')
        conf = i.get('confidence_score', 0)
        print(f'{label} (confidence: {conf:.2f})')
if not found:
    print('(no intents detected in this audio)')
"