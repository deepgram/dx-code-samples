#!/usr/bin/env bash
# Recipe: Key Term Prompting (STT v1)
#
# Boosts recognition accuracy for specific key terms using Nova-3.
# Useful for domain-specific vocabulary like product names, technical
# jargon, or proper nouns that may not be in the general vocabulary.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg api -X POST \
  "/v1/listen?model=nova-3&keyterm=Deepgram&keyterm=spacewalk&smart_format=true" \
  -H "Content-Type: application/json" \
  --input <(printf '{"url":"%s"}' "$AUDIO_URL") \
  --jq '.results.channels[0].alternatives[0].transcript'
