"""
Recipe: G.711 Mu-Law Streaming Transcription (Speech-to-Text v1)
================================================================
Streams G.711 mu-law audio (telephony codec: Twilio, SIP, VoIP) over
WebSocket with encoding=mulaw and sample_rate=8000.
"""
import audioop, io, threading, time, urllib.request, wave
from deepgram import DeepgramClient
from deepgram.core.events import EventType
from deepgram.listen.v1.types import ListenV1Results

AUDIO_URL = "https://dpgr.am/spacewalk.wav"

def to_mulaw_8k(wav_bytes: bytes) -> bytes:
    with wave.open(io.BytesIO(wav_bytes), "rb") as wf:
        pcm, width = wf.readframes(wf.getnframes()), wf.getsampwidth()
        channels, rate = wf.getnchannels(), wf.getframerate()
    if channels > 1:
        pcm = audioop.tomono(pcm, width, 1.0, 0.0)
    pcm, _ = audioop.ratecv(pcm, width, 1, rate, 8000, None)
    return audioop.lin2ulaw(pcm, width)

def main():
    client = DeepgramClient()
    mulaw_data = to_mulaw_8k(urllib.request.urlopen(AUDIO_URL).read())
    print(f"Converted to mu-law: {len(mulaw_data)} bytes at 8 kHz")

    with client.listen.v1.connect(
        model="nova-3", encoding="mulaw", sample_rate=8000, smart_format=True,
    ) as connection:
        def on_message(message) -> None:
            if isinstance(message, ListenV1Results):
                text = message.channel.alternatives[0].transcript
                if text:
                    print(text)

        connection.on(EventType.MESSAGE, on_message)

        def send_audio():
            for i in range(0, len(mulaw_data), 320):
                connection.send_media(mulaw_data[i : i + 320])
                time.sleep(0.04)
            time.sleep(2)
            connection.send_close_stream()

        threading.Thread(target=send_audio, daemon=True).start()
        connection.start_listening()

if __name__ == "__main__":
    main()
