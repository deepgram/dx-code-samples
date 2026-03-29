import os
from deepgram import DeepgramClient, PrerecordedOptions

AUDIO_URL = "https://dpgr.am/spacewalk.wav"

def main():
    client = DeepgramClient(os.environ["DEEPGRAM_API_KEY"])

    options = PrerecordedOptions(
        model="nova-3",
        smart_format=True,
        diarize=True,
    )

    response = client.listen.rest.v("1").transcribe_url(
        {"url": AUDIO_URL},
        options,
    )

    # Words include speaker labels when diarize=True
    words = response.results.channels[0].alternatives[0].words
    current_speaker = None
    for word in words:
        if word.speaker != current_speaker:
            current_speaker = word.speaker
            print(f"\n[Speaker {current_speaker}]", end=" ")
        print(word.word, end=" ")
    print()

if __name__ == "__main__":
    main()
