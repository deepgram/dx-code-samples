"""
Streams audio over WebSocket with `keyterm` boosting. Terms from prior
conversation turns are boosted so the model recognises them consistently.
"""

import threading
import time
import urllib.request

from deepgram import DeepgramClient
from deepgram.core.events import EventType
from deepgram.listen.v1.types import ListenV1Results

AUDIO_URL = "https://dpgr.am/spacewalk.wav"
CONTEXT_TERMS = ["spacewalk", "ISS", "Alexei Leonov", "Voskhod"]


def main():
    client = DeepgramClient()  # reads DEEPGRAM_API_KEY from environment
    audio_data = urllib.request.urlopen(AUDIO_URL).read()

    with client.listen.v1.connect(
        model="nova-3",
        smart_format=True,
        keyterm=CONTEXT_TERMS,  # <-- boost terms from prior conversation context
    ) as connection:

        def on_message(message) -> None:
            if isinstance(message, ListenV1Results):
                transcript = message.channel.alternatives[0].transcript
                if transcript:
                    label = "final" if getattr(message, "is_final", False) else "interim"
                    print(f"[{label}] {transcript}")

        connection.on(EventType.MESSAGE, on_message)

        def send_audio():
            for i in range(0, len(audio_data), 4096):
                connection.send_media(audio_data[i : i + 4096])
                time.sleep(0.01)
            time.sleep(2)
            connection.send_close_stream()

        sender = threading.Thread(target=send_audio, daemon=True)
        sender.start()
        connection.start_listening()


if __name__ == "__main__":
    main()
