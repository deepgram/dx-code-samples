"""
Recipe: Intent Recognition (Audio Intelligence v1)
====================================================
Demonstrates detecting speaker intents in audio content.

When intents=True is set, Deepgram identifies the intentions behind
what speakers say — e.g., requesting information, expressing agreement,
making a complaint. This is useful for call-centre routing, automated
ticket categorisation, or conversational analytics.
"""

from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()  # reads DEEPGRAM_API_KEY from environment

    response = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL,
        model="nova-3",
        smart_format=True,
        intents=True,  # <-- THIS enables intent recognition.
    )

    if response.results and response.results.channels:
        transcript = response.results.channels[0].alternatives[0].transcript
        print(f"Transcript: {transcript[:150]}...")

    # Intents appear in response.results.intents.segments
    if hasattr(response.results, "intents") and response.results.intents:
        segments = getattr(response.results.intents, "segments", [])
        print(f"\nIntent segments: {len(segments)}")
        for seg in segments[:5]:
            text = getattr(seg, "text", "")
            detected = getattr(seg, "intents", [])
            intent_names = [getattr(i, "intent", "") for i in detected]
            print(f"  Intents: {', '.join(intent_names)} — \"{text[:60]}\"")


if __name__ == "__main__":
    main()
