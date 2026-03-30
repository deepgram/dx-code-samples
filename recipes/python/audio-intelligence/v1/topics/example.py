"""
Recipe: Topic Detection (Audio Intelligence v1)
=================================================
Demonstrates detecting topics discussed in audio content.

When topics=True is set, Deepgram identifies key topics mentioned in
the audio and returns them with confidence scores. This is useful for
content categorisation, meeting tagging, or media indexing.
"""

from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()  # reads DEEPGRAM_API_KEY from environment

    response = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL,
        model="nova-3",
        smart_format=True,
        topics=True,  # <-- THIS enables topic detection.
    )

    if response.results and response.results.channels:
        transcript = response.results.channels[0].alternatives[0].transcript
        print(f"Transcript: {transcript[:150]}...")

    # Topics appear in response.results.topics.segments
    if hasattr(response.results, "topics") and response.results.topics:
        segments = getattr(response.results.topics, "segments", [])
        print(f"\nTopic segments: {len(segments)}")
        for seg in segments[:5]:
            text = getattr(seg, "text", "")
            detected = getattr(seg, "topics", [])
            topic_names = [getattr(t, "topic", "") for t in detected]
            print(f"  Topics: {', '.join(topic_names)} — \"{text[:60]}\"")


if __name__ == "__main__":
    main()
