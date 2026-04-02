#!/usr/bin/env bash
# Recipe: Dictation Mode (STT v1)
#
# Enables dictation mode which interprets spoken punctuation commands
# like "period", "comma", "new paragraph" as formatting instructions
# rather than transcribing them as words.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg api -X POST \
  "/v1/listen?model=nova-3&dictation=true&smart_format=true" \
  -H "Content-Type: application/json" \
  --input <(printf '{"url":"%s"}' "$AUDIO_URL") \
  --jq '.results.channels[0].alternatives[0].transcript'
