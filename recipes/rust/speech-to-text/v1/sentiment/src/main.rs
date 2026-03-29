/*
 * Deepgram Rust SDK: Sentiment Analysis
 * 
 * This recipe demonstrates automatic sentiment analysis which identifies the emotional tone and attitude in spoken words.
 * Unlike basic transcription, sentiment analysis determines whether the speaker's attitude is positive, negative, or neutral throughout the audio content.
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
    
    // Enable Sentiment Analysis
    let options = Options::builder()
        .sentiment(true) // <-- THIS is the feature this recipe demonstrates
        .smart_format(true)    // Optional: improve formatting
        .model("nova-2".to_string().into()) // Optional: specify model for best results
        .build();

    let response = dg.transcription().prerecorded(source, &options).await?;

    // Print full response to see sentiment structure
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
