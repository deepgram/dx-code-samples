import os
import json
from deepgram import DeepgramClient, PrerecordedOptions

AUDIO_URL = "https://dpgr.am/spacewalk.wav"

def main():
    client = DeepgramClient(os.environ["DEEPGRAM_API_KEY"])

    options = PrerecordedOptions(
        model="nova-3",
        smart_format=True,
        paragraphs=True,
    )

    response = client.listen.rest.v("1").transcribe_url(
        {"url": AUDIO_URL},
        options,
    )

    # Paragraphs are structured in the first channel's paragraphs object
    paragraphs = response.results.channels[0].alternatives[0].paragraphs
    if paragraphs and paragraphs.paragraphs:
        for i, para in enumerate(paragraphs.paragraphs, 1):
            sentences = [s.text for s in para.sentences]
            print(f"[Paragraph {i}]")
            print(" ".join(sentences))
            print()
    else:
        print("No paragraphs returned")

if __name__ == "__main__":
    main()
