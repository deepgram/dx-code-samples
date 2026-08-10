"""Multilingual code-switching via streaming — uses language="multi" so Nova-3
detects and labels the spoken language per utterance in real time."""

import threading
import time
import urllib.request

from deepgram import DeepgramClient
from deepgram.core.events import EventType
from deepgram.listen.v1.types import ListenV1Results

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()
    audio_data = urllib.request.urlopen(AUDIO_URL).read()

    with client.listen.v1.connect(
        model="nova-3",
        language="multi",  # <-- enables multilingual code-switching detection
        smart_format=True,
        interim_results=False,
    ) as connection:

        def on_message(message) -> None:
            if isinstance(message, ListenV1Results):
                channel = message.channel
                transcript = channel.alternatives[0].transcript
                if transcript:
                    lang = getattr(channel, "detected_language", "unknown")
                    print(f"[{lang}] {transcript}")

        connection.on(EventType.MESSAGE, on_message)

        def send_audio():
            chunk_size = 4096
            for i in range(0, len(audio_data), chunk_size):
                connection.send_media(audio_data[i : i + chunk_size])
                time.sleep(0.01)
            time.sleep(2)
            connection.send_close_stream()

        sender = threading.Thread(target=send_audio, daemon=True)
        sender.start()
        connection.start_listening()


if __name__ == "__main__":
    main()
