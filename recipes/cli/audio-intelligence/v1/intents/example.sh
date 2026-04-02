#!/usr/bin/env bash
# Recipe: Intent Recognition (Audio Intelligence v1)
#
# Analyses spoken content and outputs intents data
# alongside the transcript in the CLI's human-readable format.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg listen "$AUDIO_URL" --model nova-3 --intents