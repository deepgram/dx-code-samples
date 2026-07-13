"""In-Band Reconfiguration — update keyterms and eot_threshold mid-stream."""

import threading, time, urllib.request

from deepgram import DeepgramClient
from deepgram.core.events import EventType
from deepgram.listen.v2.types import (
    ListenV2CloseStream, ListenV2Configure,
    ListenV2ConfigureThresholds, ListenV2TurnInfo,
)

AUDIO_URL = "https://dpgr.am/spacewalk.wav"


def main():
    client = DeepgramClient()
    audio_data = urllib.request.urlopen(AUDIO_URL).read()

    with client.listen.v2.connect(model="flux-general-en") as conn:
        def on_message(msg):
            if isinstance(msg, ListenV2TurnInfo):
                print(f"[turn {msg.turn_index}] {msg.transcript}")
            elif isinstance(msg, dict) and msg.get("type") == "ConfigureSuccess":
                print(f"Config applied: keyterms={msg.get('keyterms')}")

        conn.on(EventType.MESSAGE, on_message)

        def send_audio():
            chunk, mid = 4096, len(audio_data) // 2
            for i in range(0, mid, chunk):
                conn.send_media(audio_data[i : i + chunk])
                time.sleep(0.01)
            conn.send_configure(ListenV2Configure(
                keyterms=["spacewalk", "EVA", "ISS"],
                thresholds=ListenV2ConfigureThresholds(eot_threshold=0.7),
            ))
            print("Sent mid-stream reconfiguration")
            for i in range(mid, len(audio_data), chunk):
                conn.send_media(audio_data[i : i + chunk])
                time.sleep(0.01)
            time.sleep(2)
            conn.send_close_stream(ListenV2CloseStream(type="CloseStream"))

        threading.Thread(target=send_audio, daemon=True).start()
        conn.start_listening()


if __name__ == "__main__":
    main()
