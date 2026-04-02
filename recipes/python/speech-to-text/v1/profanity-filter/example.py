"""
Recipe: Profanity Filter (Speech-to-Text v1)
==============================================
Demonstrates the `profanity_filter` feature, which detects recognized
profanity in the audio and either replaces it with the nearest
non-profane word or removes it from the transcript entirely.

This is useful for content moderation, public-facing transcripts,
or broadcasting applications.
"""

from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()  # reads DEEPGRAM_API_KEY from environment

    response = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL,
        model="nova-3",
        smart_format=True,
        profanity_filter=True,  # <-- THIS enables profanity filtering.
                                # Profane words are replaced or removed.
    )

    if response.results and response.results.channels:
        transcript = response.results.channels[0].alternatives[0].transcript
        print(transcript)


if __name__ == "__main__":
    main()
