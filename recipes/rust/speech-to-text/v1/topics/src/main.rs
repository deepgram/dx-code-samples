/*
 * Deepgram Rust SDK: Topic Detection
 * 
 * This recipe demonstrates automatic topic detection which identifies key
 * topics and themes discussed in the audio content. Unlike basic transcription,
 * topic detection analyzes the content semantically to extract main subjects,
 * concepts, and discussion points.
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
    
    // Enable topic detection
    let options = Options::builder()
        .topics(true) // <-- THIS is the feature this recipe demonstrates
        .smart_format(true)    // Optional: improve formatting
        .model("nova-2".to_string().into()) // Optional: specify model for best results
        .build();

    let response = dg.transcription().prerecorded(source, &options).await?;

    // Print full response to see topics structure
    println!("Full Response:");
    println!("{}", serde_json::to_string_pretty(&response.results)?);

    // Also print transcript for context
    let channels = &response.results.channels;
    for channel in channels {
        let alternatives = &channel.alternatives;
        for alt in alternatives {
            println!("\nTranscript: {}", alt.transcript);
        }
    }

    Ok(())
}
