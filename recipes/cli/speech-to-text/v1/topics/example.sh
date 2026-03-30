#!/usr/bin/env bash
# Recipe: Topic Detection (Speech-to-Text v1)
#
# Identifies the key topics discussed in the audio and
# returns them with confidence scores.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg listen "$AUDIO_URL" --model nova-3 --topics