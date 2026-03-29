//! # Punctuate - Automatic punctuation insertion
//! This recipe demonstrates automatic punctuation insertion in transcripts. With punctuation
//! enabled, the transcript includes commas, periods, question marks, and other punctuation
//! marks based on speech patterns and natural language structure.

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

    // Enable automatic punctuation insertion
    let options = Options::builder()
        .model(Model::CustomId(String::from("nova-3")))
        .punctuate(true)  // <-- THIS is the feature this recipe demonstrates
        .build();

    // Transcribe with punctuation
    let response = dg.transcription().prerecorded(source, &options).await?;

    // Extract and print punctuated transcript
    // Response path: response.results.channels[0].alternatives[0].transcript
    // Punctuation adds proper sentence structure to the transcript
    let transcript = &response.results.channels[0].alternatives[0].transcript;
    println!("{}", transcript);

    Ok(())
}

// Other useful parameters: .smart_format(true), .paragraphs(true), .diarize(true)