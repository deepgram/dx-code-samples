#!/usr/bin/env bash
# Recipe: Live Streaming Transcription (Speech-to-Text v1)
#
# Streams audio to Deepgram over WebSocket for real-time transcription.
# Uses ffmpeg to pipe a remote audio file as raw PCM, simulating a
# live audio source without requiring a microphone.

AUDIO_URL="https://dpgr.am/spacewalk.wav"
TEMP_FILE=$(mktemp /tmp/deepgram-XXXXXX.wav)
trap "rm -f $TEMP_FILE" EXIT

curl -sL "$AUDIO_URL" -o "$TEMP_FILE"

ffmpeg -i "$TEMP_FILE" -f s16le -ar 16000 -ac 1 -loglevel quiet - \
  | dg listen --encoding linear16 --model nova-3 --smart-format