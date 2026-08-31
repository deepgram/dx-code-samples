"""
Recipe: Multi-Configuration Audio Analysis (Speech-to-Text v1)
===============================================================
Processes the same audio with three different Deepgram configurations
to show how different parameters yield different analytical insights.
This pattern is useful for post-call re-analysis in contact centers.
"""

from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()

    base = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL, model="nova-3", smart_format=True,
    )
    transcript = base.results.channels[0].alternatives[0].transcript
    print(f"[Config 1 — Base] {transcript[:120]}...")

    diarized = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL, model="nova-3", smart_format=True,
        diarize=True, keywords=["spacewalk:2", "ISS:1.5"],
    )
    words = diarized.results.channels[0].alternatives[0].words or []
    speakers = {getattr(w, "speaker", 0) for w in words}
    print(f"[Config 2 — Diarize+Keywords] {len(speakers)} speakers detected")

    intel = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL, model="nova-3", smart_format=True,
        summarize="v2", topics=True, sentiment=True,
    )
    r = intel.results
    summary = getattr(r.summary, "short", "") if hasattr(r, "summary") and r.summary else "N/A"
    topic_names = []
    if hasattr(r, "topics") and r.topics:
        for seg in getattr(r.topics, "segments", []):
            topic_names.extend(getattr(t, "topic", "") for t in getattr(seg, "topics", []))
    print(f"[Config 3 — Intelligence] Summary: {summary[:100]}")
    print(f"[Config 3 — Intelligence] Topics: {', '.join(dict.fromkeys(topic_names).keys()) or 'N/A'}")


if __name__ == "__main__":
    main()
