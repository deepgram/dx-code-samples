#!/usr/bin/env bash
# Recipe: Intent Recognition (Speech-to-Text v1)
#
# Detects speaker intents in the transcript, identifying what
# the speakers are trying to accomplish or communicate.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg listen "$AUDIO_URL" --model nova-3 --intents