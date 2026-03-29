import os
from deepgram import DeepgramClient, SpeakOptions

TEXT = "Hello! This is a Deepgram text-to-speech example using the aura-2 voice model."
OUTPUT_FILE = "output.mp3"

def main():
    client = DeepgramClient(os.environ["DEEPGRAM_API_KEY"])

    options = SpeakOptions(
        model="aura-2-thalia-en",
        encoding="mp3",
    )

    response = client.speak.rest.v("1").save(
        OUTPUT_FILE,
        {"text": TEXT},
        options,
    )

    size = os.path.getsize(OUTPUT_FILE)
    print(f"Saved {OUTPUT_FILE}: {size} bytes ({response.content_type})")

if __name__ == "__main__":
    main()
