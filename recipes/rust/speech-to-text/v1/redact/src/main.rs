/*
 * Deepgram Rust SDK: Content Redaction
 * 
 * This recipe demonstrates automatic content redaction which identifies and
 * removes sensitive information from transcripts. Unlike basic transcription,
 * redaction replaces sensitive data like credit card numbers, social security
 * numbers, and personal information with placeholder text.
 */

use std::env;
use deepgram::{Deepgram, DeepgramError};
use deepgram::common::{audio_source::AudioSource, options::{Options, Redact}};

#[tokio::main]
async fn main() -> Result<(), DeepgramError> {
    let api_key = env::var("DEEPGRAM_API_KEY")
        .expect("DEEPGRAM_API_KEY environment variable not set");

    let dg = Deepgram::new(&api_key)?;
    let source = AudioSource::from_url("https://dpgr.am/spacewalk.wav");
    
    // Enable content redaction for PCI and SSN data
    let options = Options::builder()
        .redact(vec![Redact::Pci, Redact::Ssn]) // <-- THIS is the feature this recipe demonstrates
        .smart_format(true)    // Optional: improve formatting
        .model("nova-2".to_string().into()) // Optional: specify model for best results
        .build();

    let response = dg.transcription().prerecorded(source, &options).await?;

    // Redacted content appears in the normal transcript with sensitive data replaced
    // Sensitive information will be replaced with placeholder text like [PCI] or [SSN]
    let channels = &response.results.channels;
    for channel in channels {
        let alternatives = &channel.alternatives;
        for alt in alternatives {
            println!("Redacted Transcript: {}", alt.transcript);
        }
    }

    // Print full response to see if redaction metadata is available
    println!("\nFull Response:");
    println!("{}", serde_json::to_string_pretty(&response.results)?);

    Ok(())
}