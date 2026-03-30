"""
Recipe: Transcribe local audio file (Speech-to-Text v1)
========================================================
Demonstrates pre-recorded transcription from a local file instead of a URL.

The SDK accepts raw bytes via `transcribe_file()`. You read the file into
memory (or stream it), then send the bytes. The response format is identical
to `transcribe_url()`.

See also: speech-to-text/v1/transcribe-url for URL-based transcription.
"""

import urllib.request
from deepgram import DeepgramClient

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()  # reads DEEPGRAM_API_KEY from environment

    # Download a sample audio file to demonstrate local-file transcription.
    # In production you would open an existing local file instead.
    audio_data = urllib.request.urlopen(AUDIO_URL).read()
    print(f"Downloaded {len(audio_data)} bytes")

    # transcribe_file() accepts raw bytes (or an iterator of bytes for large files).
    # Parameters are the same as transcribe_url() — model, smart_format, etc.
    response = client.listen.v1.media.transcribe_file(
        request=audio_data,
        model="nova-3",
        smart_format=True,
    )

    if response.results and response.results.channels:
        transcript = response.results.channels[0].alternatives[0].transcript
        print(transcript)


if __name__ == "__main__":
    main()
