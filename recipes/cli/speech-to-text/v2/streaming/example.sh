#!/usr/bin/env bash
# Recipe: Live Streaming Transcription (STT v2)
#
# Streams a local audio file through ffmpeg and pipes raw audio
# to dg listen with the flux-general-en model for high-accuracy
# English streaming transcription. The CLI routes to the v2
# WebSocket endpoint when a flux-* model is specified.

AUDIO_URL="https://dpgr.am/spacewalk.wav"
AUDIO_FILE="/tmp/spacewalk.wav"

curl -sL "$AUDIO_URL" -o "$AUDIO_FILE"

ffmpeg -i "$AUDIO_FILE" -f s16le -ar 16000 -ac 1 -loglevel quiet - \
  | dg listen --encoding linear16 --model flux-general-en
