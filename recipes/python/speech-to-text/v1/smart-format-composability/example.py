"""
Recipe: Smart Format Composability (Speech-to-Text v1)
======================================================
Composes smart_format with diarize, utterances, paragraphs, keyterm
boosting, and redaction in a single API call — all active at once.
"""
from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"

def main():
    client = DeepgramClient()  # reads DEEPGRAM_API_KEY from environment
    response = client.listen.v1.media.transcribe_url(
        url=AUDIO_URL,
        model="nova-3",
        smart_format=True,
        diarize=True,
        utterances=True,
        paragraphs=True,
        keyterm="spacewalk",
        redact="pci",
    )
    results = response.results
    if not results or not results.channels:
        return
    alt = results.channels[0].alternatives[0]

    print("=== Word-level detail (speaker + timestamps) ===")
    for w in alt.words[:10]:
        speaker = getattr(w, "speaker", "?")
        print(f"  [{w.start:.2f}s] Speaker {speaker}: {w.word}")

    if results.utterances:
        print("\n=== Utterances ===")
        for utt in results.utterances[:5]:
            speaker = getattr(utt, "speaker", "?")
            print(f"  Speaker {speaker}: {utt.transcript}")

    if alt.paragraphs and alt.paragraphs.paragraphs:
        print("\n=== Paragraphs ===")
        for para in alt.paragraphs.paragraphs[:3]:
            text = " ".join(s.text for s in para.sentences)
            print(f"  Speaker {para.speaker}: {text[:120]}")

    print(f"\n=== Transcript (formatted + redacted) ===")
    print(alt.transcript[:300])

if __name__ == "__main__":
    main()
