"""
Recipe: Compare Deepgram models on the same audio (Speech-to-Text v1)
=====================================================================
Transcribes one audio file with multiple models (nova-3, nova-2) and
prints each transcript alongside the elapsed time so you can compare
accuracy and latency side by side.
"""

import time
from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"
MODELS = ["nova-3", "nova-2"]


def main():
    client = DeepgramClient()

    for model in MODELS:
        start = time.perf_counter()
        response = client.listen.v1.media.transcribe_url(
            url=AUDIO_URL,
            model=model,
            smart_format=True,
        )
        elapsed = time.perf_counter() - start

        transcript = ""
        if response.results and response.results.channels:
            transcript = response.results.channels[0].alternatives[0].transcript

        print(f"=== {model} ({elapsed:.2f}s) ===")
        print(transcript[:200])
        print()


if __name__ == "__main__":
    main()
