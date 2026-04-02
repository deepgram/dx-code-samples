#!/usr/bin/env bash
# Recipe: Sentiment Analysis (Audio Intelligence v1)
#
# Analyses spoken content and outputs sentiment data
# alongside the transcript in the CLI's human-readable format.

AUDIO_URL="https://dpgr.am/spacewalk.wav"

dg listen "$AUDIO_URL" --model nova-3 --sentiment