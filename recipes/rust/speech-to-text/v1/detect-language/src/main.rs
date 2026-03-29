/*
 * Deepgram Rust SDK: Language Detection
 * 
 * This recipe demonstrates automatic language detection which identifies
 * the primary language spoken in an audio file. Instead of specifying
 * a language, Deepgram analyzes the audio and returns both the detected
 * language and the transcript in that language.
 */

use std::env;
use deepgram::{Deepgram, DeepgramError};
use deepgram::common::{audio_source::AudioSource, options::{Options, DetectLanguage}};

#[tokio::main]
async fn main() -> Result<(), DeepgramError> {
    let api_key = env::var("DEEPGRAM_API_KEY")
        .expect("DEEPGRAM_API_KEY environment variable not set");

    let dg = Deepgram::new(&api_key)?;
    let source = AudioSource::from_url("https://dpgr.am/spacewalk.wav");
    
    // Enable automatic language detection
    let options = Options::builder()
        .detect_language(DetectLanguage::Enabled) // <-- THIS is the feature this recipe demonstrates
        .smart_format(true)    // Optional: improve formatting
        .model("nova-2".to_string().into()) // Optional: specify model
        .build();

    let response = dg.transcription().prerecorded(source, &options).await?;

    // Language detection results appear with the transcript
    // Print full response to see actual structure
    println!("Full Response:");
    println!("{}", serde_json::to_string_pretty(&response.results)?);

    // Print transcript - language detection will improve accuracy automatically
    let channels = &response.results.channels;
    for channel in channels {
        let alternatives = &channel.alternatives;
        for alt in alternatives {
            println!("Transcript: {}", alt.transcript);
        }
    }

    Ok(())
}