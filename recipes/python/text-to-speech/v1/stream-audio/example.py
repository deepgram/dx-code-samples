"""
Recipe: Stream Audio Response (Text-to-Speech v1)
===================================================
Demonstrates streaming TTS audio as it generates using the REST API.

generate() returns an Iterator[bytes] that yields audio chunks as they
arrive from the API. Instead of saving to a file, this recipe processes
chunks as they stream — printing their sizes to show the streaming
behaviour. In production, you would feed these chunks to an audio player.
"""

from deepgram import DeepgramClient

TEXT = "Streaming text to speech lets you start playing audio before the full response arrives."


def main():
    client = DeepgramClient()  # reads DEEPGRAM_API_KEY from environment

    # generate() returns an iterator — audio arrives in chunks.
    # This lets you start processing (or playing) audio immediately.
    audio_chunks = client.speak.v1.audio.generate(
        text=TEXT,
        model="aura-2-thalia-en",
        encoding="linear16",  # linear16 for raw PCM streaming
    )

    total_bytes = 0
    chunk_count = 0
    for chunk in audio_chunks:
        total_bytes += len(chunk)
        chunk_count += 1
        # In production: feed each chunk to an audio player or WebSocket
        # e.g., audio_player.write(chunk)

    print(f"Received {chunk_count} chunks, {total_bytes} bytes total")


if __name__ == "__main__":
    main()
