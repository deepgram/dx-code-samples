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
for seg in r['results']['sentiments']['segments']:
    s = seg['sentiment']
    print(f'{s}: {seg[\"text\"][:80]}')
"
