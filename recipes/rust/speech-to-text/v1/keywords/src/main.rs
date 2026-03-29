/*
 * Deepgram Rust SDK: Keyword Boosting
 * 
 * This recipe demonstrates keyword boosting which increases recognition
 * accuracy for specific terms by providing hints to the speech recognition
 * engine. Unlike basic transcription, keyword boosting helps ensure important
 * domain-specific terms are transcribed correctly with higher confidence.
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
    
    // Add keyword boosting for space-related terms
    let options = Options::builder()
        .keywords(vec!["NASA:2", "spacewalk:1.5"]) // <-- THIS is the feature this recipe demonstrates
        .smart_format(true)    // Optional: improve formatting
        .model("nova-2".to_string().into()) // Optional: specify model for best results
        .build();

    let response = dg.transcription().prerecorded(source, &options).await?;

    // Keywords appear in normal transcript but with improved accuracy
    // The boosting should make terms like "NASA" and "spacewalk" more accurate
    let channels = &response.results.channels;
    for channel in channels {
        let alternatives = &channel.alternatives;
        for alt in alternatives {
            println!("Transcript with keyword boosting: {}", alt.transcript);
            
            // Show confidence scores if available (words field might not always be present)
            // For this demo, keywords improve overall transcript accuracy
        }
    }

    // Print full response to see any keyword-specific metadata
    println!("\nFull Response:");
    println!("{}", serde_json::to_string_pretty(&response.results)?);

    Ok(())
}