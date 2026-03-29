import os
from deepgram import DeepgramClient, PrerecordedOptions

AUDIO_URL = "https://dpgr.am/spacewalk.wav"

def main():
    client = DeepgramClient(os.environ["DEEPGRAM_API_KEY"])

    options = PrerecordedOptions(
        model="nova-3",
        smart_format=True,
    )

    response = client.listen.rest.v("1").transcribe_url(
        {"url": AUDIO_URL},
        options,
    )

    transcript = response.results.channels[0].alternatives[0].transcript
    print(transcript)

if __name__ == "__main__":
    main()
