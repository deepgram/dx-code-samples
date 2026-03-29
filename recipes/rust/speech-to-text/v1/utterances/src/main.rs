//! # Utterances - Speech segment timing and structure
//! This recipe demonstrates utterance detection, which segments audio into individual
//! speech utterances with precise timing information. Each utterance represents a 
//! continuous speech segment with start/end times and confidence scores.

use std::env;
use deepgram::{Deepgram, DeepgramError};
use deepgram::common::{
    audio_source::AudioSource,
    options::{Options, Model}
};

#[tokio::main]
async fn main() -> Result<(), DeepgramError> {
    let api_key = env::var("DEEPGRAM_API_KEY")
        .expect("DEEPGRAM_API_KEY environment variable not set");

    let dg = Deepgram::new(&api_key)?;

    // Create audio source from URL
    let source = AudioSource::from_url("https://dpgr.am/spacewalk.wav");

    // Enable utterance detection for speech segmentation
    let options = Options::builder()
        .model(Model::CustomId(String::from("nova-3")))
        .utterances(true)  // <-- THIS is the feature this recipe demonstrates
        .punctuate(true)   // Recommended with utterances
        .build();

    // Transcribe with utterance detection
    let response = dg.transcription().prerecorded(source, &options).await?;

    // Print utterance information with timing
    // Response path: response.results.utterances
    // Note: Utterances may be None if no clear speech segments detected
    if let Some(utterances) = &response.results.utterances {
        for (i, utterance) in utterances.iter().enumerate() {
            println!("Utterance {}: {:.2}s - {:.2}s (confidence: {:.2})",
                i + 1,
                utterance.start,
                utterance.end,
                utterance.confidence
            );
            println!("{}", utterance.transcript);
            println!();
        }
    } else {
        // Fallback if no utterances detected
        let transcript = &response.results.channels[0].alternatives[0].transcript;
        println!("No utterances detected. Full transcript: {}", transcript);
    }

    Ok(())
}

// Other useful parameters: .diarize(true), .paragraphs(true), .smart_format(true)