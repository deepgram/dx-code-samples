#!/usr/bin/env bash
# Recipe: Profanity Filter (STT v1)
#
# Masks profane words in the transcript by replacing them with
# asterisks, keeping the output safe for public-facing content.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg api -X POST \
  "/v1/listen?model=nova-3&profanity_filter=true&smart_format=true" \
  -H "Content-Type: application/json" \
  --input <(printf '{"url":"%s"}' "$AUDIO_URL") \
  --jq '.results.channels[0].alternatives[0].transcript'
