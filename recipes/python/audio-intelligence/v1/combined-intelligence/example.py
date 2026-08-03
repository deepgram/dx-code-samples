"""
Recipe: Combined Audio Intelligence (Audio Intelligence v1)
=============================================================
Enables ALL intelligence features in a single API call: sentiment, topics,
intents, entity detection, and summarization — no redundant calls needed.
"""

from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()  # reads DEEPGRAM_API_KEY from environment
    response = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL, model="nova-3", smart_format=True,
        sentiment=True, topics=True, intents=True,
        detect_entities=True, summarize="v2",
    )

    print(f"Transcript: {response.results.channels[0].alternatives[0].transcript[:150]}...")

    r = response.results
    if hasattr(r, "summary") and r.summary:
        print(f"\nSummary: {getattr(r.summary, 'short', '')}")
    if hasattr(r, "sentiments") and r.sentiments:
        segs = getattr(r.sentiments, "segments", [])
        print(f"\nSentiment segments: {len(segs)}")
        for s in segs[:3]:
            print(f"  [{getattr(s, 'sentiment', '')}] {getattr(s, 'text', '')[:70]}")
    if hasattr(r, "topics") and r.topics:
        segs = getattr(r.topics, "segments", [])
        print(f"\nTopic segments: {len(segs)}")
        for s in segs[:3]:
            print(f"  {', '.join(getattr(t, 'topic', '') for t in getattr(s, 'topics', []))}")
    if hasattr(r, "intents") and r.intents:
        segs = getattr(r.intents, "segments", [])
        print(f"\nIntent segments: {len(segs)}")
        for s in segs[:3]:
            print(f"  {', '.join(getattr(i, 'intent', '') for i in getattr(s, 'intents', []))}")
    if hasattr(r, "entities") and r.entities:
        print(f"\nEntities: {len(r.entities)}")


if __name__ == "__main__":
    main()
