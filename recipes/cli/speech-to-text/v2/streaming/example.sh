#!/usr/bin/env bash
# Recipe: Live Streaming Transcription (STT v2)
#
# Streams audio over WebSocket using the v2 endpoint with the
# flux-general-en model. The CLI automatically routes to v2
# when a flux-* model is specified.

AUDIO_URL="https://dpgr.am/spacewalk.wav"
AUDIO_FILE="/tmp/spacewalk.wav"

curl -sL "$AUDIO_URL" -o "$AUDIO_FILE"

ffmpeg -i "$AUDIO_FILE" -f s16le -ar 16000 -ac 1 -loglevel quiet - \
  | dg listen --encoding linear16 --model flux-general-en
