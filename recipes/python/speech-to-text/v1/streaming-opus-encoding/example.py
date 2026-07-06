"""Stream Opus-encoded audio over WebSocket for 10-20x bandwidth savings."""

import subprocess
import threading
import time
import urllib.request

from deepgram import DeepgramClient
from deepgram.core.events import EventType
from deepgram.listen.v1.types import ListenV1Results

AUDIO_URL = "https://dpgr.am/spacewalk.wav"

def main():
    client = DeepgramClient()
    wav_data = urllib.request.urlopen(AUDIO_URL).read()
    opus_data = subprocess.run(
        ["ffmpeg", "-i", "pipe:0", "-c:a", "libopus", "-ar", "48000",
         "-ac", "1", "-f", "opus", "pipe:1"],
        input=wav_data, capture_output=True, check=True,
    ).stdout
    print(f"PCM: {len(wav_data)} bytes → Opus: {len(opus_data)} bytes ({len(wav_data)/len(opus_data):.1f}x smaller)")

    with client.listen.v1.connect(
        model="nova-3", encoding="opus", sample_rate=48000, smart_format=True,
    ) as connection:
        def on_message(message) -> None:
            if isinstance(message, ListenV1Results):
                txt = message.channel.alternatives[0].transcript
                if txt:
                    print(txt)

        connection.on(EventType.MESSAGE, on_message)

        def send_audio():
            for i in range(0, len(opus_data), 4096):
                connection.send_media(opus_data[i : i + 4096])
                time.sleep(0.01)
            time.sleep(2)
            connection.send_close_stream()

        threading.Thread(target=send_audio, daemon=True).start()
        connection.start_listening()


if __name__ == "__main__":
    main()
