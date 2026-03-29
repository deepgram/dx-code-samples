/**
 * Recipe: Multichannel (Speech-to-Text v1)
 * ==========================================
 * Demonstrates the `multichannel` feature, which transcribes each audio
 * channel independently.
 *
 * Without multichannel: all channels are mixed into one transcript.
 * With multichannel:    response.results.channels contains one entry per
 *                       audio channel, each with its own transcript.
 *
 * Useful for stereo call recordings where each speaker is on a separate channel.
 * Note: the spacewalk demo audio is mono, so only one channel is returned.
 */

import { DeepgramClient } from "@deepgram/sdk";

const AUDIO_URL = "https://dpgr.am/spacewalk.wav";

async function main() {
  const client = new DeepgramClient();

  const response = await client.listen.v1.media.transcribeUrl({
    url: AUDIO_URL,
    model: "nova-3",
    smart_format: true,
    multichannel: true,  // <-- THIS is the feature this recipe demonstrates.
                         // Returns separate transcripts per audio channel.
    // Optional: diarize=true (per-channel speaker IDs)
  });

  // Multichannel data path:
  //   response.results.channels — array with one entry per audio channel
  //     channel.alternatives[0].transcript — transcript for that channel
  // The spacewalk demo is mono so channels will have length 1.
  const channels = response.results?.channels;
  if (channels) {
    for (let i = 0; i < channels.length; i++) {
      console.log(`--- Channel ${i} ---`);
      console.log(channels[i].alternatives[0].transcript);
      console.log();
    }
  }
}

main().catch(console.error);