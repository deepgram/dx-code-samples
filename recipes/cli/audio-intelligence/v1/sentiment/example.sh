#!/usr/bin/env bash
# Recipe: Sentiment Analysis (Audio Intelligence v1)
#
# Analyses spoken content for sentiment — positive, negative,
# or neutral — at the segment level, with a confidence score.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg listen "$AUDIO_URL" \
  --model nova-3 \
  --sentiment \
  -o json \
  | python3 -c "
import sys, json
r = json.load(sys.stdin)
transcript = r['results']['channels'][0]['alternatives'][0]['transcript']
print(transcript[:200])

segments = r.get('results', {}).get('sentiments', {}).get('segments', [])
if segments:
    print()
    print('Sentiments:')
    for seg in segments:
        label = seg.get('sentiment', 'unknown')
        text = seg.get('text', '')
        print(f'{label}: {text[:80]}')
else:
    print('(no sentiment segments detected)')
"