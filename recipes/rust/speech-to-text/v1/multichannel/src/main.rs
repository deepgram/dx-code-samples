/*
 * Deepgram Rust SDK: Multichannel Speech Recognition
 * 
 * This recipe demonstrates multichannel audio processing where each audio
 * channel is transcribed separately. Unlike single-channel transcription,
 * this returns separate transcripts for each channel in the audio file.
 */

use std::env;
use deepgram::{Deepgram, DeepgramError};
use deepgram::common::{audio_source::AudioSource, options::Options};

#[tokio::main]
async fn main() -> Result<(), DeepgramError> {
    let api_key = env::var("DEEPGRAM_API_KEY")
        .expect("DEEPGRAM_API_KEY environment variable not set");

    let dg = Deepgram::new(&api_key)?;
    let source = AudioSource::from_url("https://dpgr.am/spacewalk.wav");
    
    // Enable multichannel processing
    let options = Options::builder()
        .multichannel(true) // <-- THIS is the feature this recipe demonstrates
        .smart_format(true)  // Optional: also enable smart formatting
        .model("nova-2".to_string().into()) // Optional: specify model
        .build();

    let response = dg.transcription().prerecorded(source, &options).await?;

    // Multichannel results appear in separate channel objects
    // Each channel contains its own alternatives array with transcripts
    let channels = &response.results.channels;
    for (channel_idx, channel) in channels.iter().enumerate() {
        let alternatives = &channel.alternatives;
        for alt in alternatives {
            println!("Channel {}: {}", channel_idx, alt.transcript);
        }
    }

    Ok(())
}