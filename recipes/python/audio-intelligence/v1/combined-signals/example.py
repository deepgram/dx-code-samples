"""
Recipe: Combined Audio Intelligence Signals (v1)
Enables sentiment, topics, intents, and summarization in one request,
printing a unified view of all signals.
"""
from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()
    response = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL, model="nova-3", smart_format=True,
        sentiment=True, topics=True, intents=True, summarize="v2",
    )
    r = response.results
    if r and r.channels:
        print(f"Transcript: {r.channels[0].alternatives[0].transcript[:120]}...")
    if hasattr(r, "summary") and r.summary:
        print(f"\nSummary: {getattr(r.summary, 'short', '')}")
    if hasattr(r, "sentiments") and r.sentiments:
        segs = getattr(r.sentiments, "segments", [])
        print(f"\nSentiment segments: {len(segs)}")
        for s in segs[:3]:
            print(f"  [{getattr(s, 'sentiment', '?')}] {getattr(s, 'text', '')[:70]}")
    if hasattr(r, "topics") and r.topics:
        segs = getattr(r.topics, "segments", [])
        print(f"\nTopic segments: {len(segs)}")
        for s in segs[:3]:
            names = [getattr(t, "topic", "") for t in getattr(s, "topics", [])]
            print(f"  Topics: {', '.join(names)}")
    if hasattr(r, "intents") and r.intents:
        segs = getattr(r.intents, "segments", [])
        print(f"\nIntent segments: {len(segs)}")
        for s in segs[:3]:
            names = [getattr(i, "intent", "") for i in getattr(s, "intents", [])]
            print(f"  Intents: {', '.join(names)}")


if __name__ == "__main__":
    main()
