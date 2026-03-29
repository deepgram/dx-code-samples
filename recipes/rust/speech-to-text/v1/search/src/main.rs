/*
 * Deepgram Rust SDK: Content Search
 * 
 * This recipe demonstrates content search which identifies when specific
 * keywords or phrases are spoken in audio. Unlike basic transcription,
 * search provides timestamps and context for when target terms appear,
 * enabling easy navigation to relevant audio segments.
 */

use std::{env, collections::HashMap};
use deepgram::{Deepgram, DeepgramError};
use deepgram::common::{audio_source::AudioSource, options::Options};

#[tokio::main]
async fn main() -> Result<(), DeepgramError> {
    let api_key = env::var("DEEPGRAM_API_KEY")
        .expect("DEEPGRAM_API_KEY environment variable not set");

    let dg = Deepgram::new(&api_key)?;
    let source = AudioSource::from_url("https://dpgr.am/spacewalk.wav");
    
    // Create options with search terms using extra parameters
    let mut extra_params = HashMap::new();
    extra_params.insert("search".to_string(), "NASA".to_string()); // <-- THIS is the feature this recipe demonstrates
    
    let options = Options::builder()
        .extra(extra_params)  // Add search terms via extra parameters
        .smart_format(true)   // Optional: improve formatting
        .model("nova-2".to_string().into()) // Optional: specify model for best results
        .build();

    let response = dg.transcription().prerecorded(source, &options).await?;

    // Print full response to see search result structure
    // Search results may appear in response.results.search or similar location
    println!("Full Response:");
    println!("{}", serde_json::to_string_pretty(&response.results)?);

    // Also print transcript for context
    let channels = &response.results.channels;
    for channel in channels {
        let alternatives = &channel.alternatives;
        for alt in alternatives {
            println!("\nTranscript: {}", alt.transcript);
            
            // Search results will appear in the full response structure above
            // The transcript will show improved accuracy for searched terms
        }
    }

    Ok(())
}