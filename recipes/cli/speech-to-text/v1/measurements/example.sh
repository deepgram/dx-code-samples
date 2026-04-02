#!/usr/bin/env bash
# Recipe: Measurements (STT v1)
#
# Converts spoken measurements to standard abbreviations in the
# transcript, e.g. "five kilograms" becomes "5 kg".

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg api -X POST \
  "/v1/listen?model=nova-3&measurements=true&smart_format=true" \
  -H "Content-Type: application/json" \
  --input <(printf '{"url":"%s"}' "$AUDIO_URL") \
  --jq '.results.channels[0].alternatives[0].transcript'
