//! # Transcribe URL - Basic speech-to-text from audio URL
//! This recipe demonstrates basic transcription using Deepgram's pre-recorded API.
//! It transcribes audio directly from a URL without any special features enabled,
//! providing a raw text transcript.

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

    // Configure options with Nova-3 model
    let options = Options::builder()
        .model(Model::CustomId(String::from("nova-3")))
        .build();

    // Transcribe the audio
    let response = dg.transcription().prerecorded(source, &options).await?;

    // Extract and print transcript
    // Response path: response.results.channels[0].alternatives[0].transcript
    let transcript = &response.results.channels[0].alternatives[0].transcript;
    println!("{}", transcript);

    Ok(())
}

// Other useful parameters: .language(Language::en_US), .smart_format(true), .punctuate(true)