#!/usr/bin/env bash
# Recipe: Audio Summarization (Audio Intelligence v1)
#
# Generates a concise text summary of spoken audio content. This is the
# audio-intelligence-focused recipe — it uses summarize=v2 alongside the
# nova-3 model to produce both a transcript and a summary.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

curl -s "https://api.deepgram.com/v1/listen?model=nova-3&summarize=v2" \
  -H "Authorization: Token $DEEPGRAM_API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"$AUDIO_URL\"}" \
  | python3 -c "
import sys, json
r = json.load(sys.stdin)
print(f'Summary: {r[\"results\"][\"summary\"][\"short\"]}')
transcript = r['results']['channels'][0]['alternatives'][0]['transcript']
print(f'Transcript: {transcript[:200]}...')
"
