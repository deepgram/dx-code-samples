"""
Recipe: Streaming STT with Client-Side VAD (Speech-to-Text v1)
Sends only speech segments over WebSocket using energy-based Voice Activity
Detection, sending keepalives during silence to reduce bandwidth.
"""
import struct, threading, time, urllib.request
from deepgram import DeepgramClient
from deepgram.core.events import EventType
from deepgram.listen.v1.types import ListenV1Results

AUDIO_URL = "https://dpgr.am/spacewalk.wav"
CHUNK = 3200  # 100 ms at 16 kHz mono 16-bit
THRESHOLD = 500
total_bytes = sent_bytes = 0

def rms(chunk: bytes) -> float:
    s = struct.unpack(f"<{len(chunk)//2}h", chunk)
    return (sum(x * x for x in s) / len(s)) ** 0.5

def main():
    global total_bytes, sent_bytes
    client = DeepgramClient()
    pcm = urllib.request.urlopen(AUDIO_URL).read()[44:]
    with client.listen.v1.connect(
        model="nova-3", smart_format=True, encoding="linear16", sample_rate=16000,
    ) as conn:
        def on_msg(msg):
            if isinstance(msg, ListenV1Results):
                t = msg.channel.alternatives[0].transcript
                if t: print(f"[transcript] {t}")
        conn.on(EventType.MESSAGE, on_msg)
        def stream():
            global total_bytes, sent_bytes
            for i in range(0, len(pcm), CHUNK):
                c = pcm[i:i + CHUNK]
                total_bytes += len(c)
                if len(c) == CHUNK and rms(c) >= THRESHOLD:
                    conn.send_media(c); sent_bytes += len(c)
                else:
                    conn.send_keep_alive()
                time.sleep(0.05)
            time.sleep(2); conn.send_close_stream()
        threading.Thread(target=stream, daemon=True).start()
        conn.start_listening()
    saved = 100 - (sent_bytes / max(total_bytes, 1)) * 100
    print(f"[vad] sent {sent_bytes}/{total_bytes} bytes ({saved:.0f}% saved)")

if __name__ == "__main__":
    main()
