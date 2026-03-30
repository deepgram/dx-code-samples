"""
Recipe: Audio Summarization (Audio Intelligence v1)
=====================================================
Demonstrates generating a concise text summary of spoken audio content.

Summarization is applied as a transcription option — set summarize="v2"
and the response includes a summary alongside the transcript. This is
useful for meeting notes, podcast highlights, or call analysis.
"""

from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()  # reads DEEPGRAM_API_KEY from environment

    response = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL,
        model="nova-3",
        smart_format=True,
        summarize="v2",  # <-- THIS enables audio summarization.
    )

    if response.results and response.results.channels:
        transcript = response.results.channels[0].alternatives[0].transcript
        print(f"Transcript: {transcript[:150]}...")

    # The summary is in response.results.summary
    if hasattr(response.results, "summary") and response.results.summary:
        short = getattr(response.results.summary, "short", "")
        print(f"\nSummary: {short}")


if __name__ == "__main__":
    main()
