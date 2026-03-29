//! # Smart Format - Enhanced transcript formatting
//! This recipe demonstrates smart formatting, which automatically formats numbers, dates, 
//! currencies, and other entities into their written forms. With smart format enabled,
//! "twenty-three dollars" becomes "$23" and "January first" becomes "January 1st".

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

    // Enable smart formatting for enhanced text formatting
    let options = Options::builder()
        .model(Model::CustomId(String::from("nova-3")))
        .smart_format(true)  // <-- THIS is the feature this recipe demonstrates
        .build();

    // Transcribe with smart formatting
    let response = dg.transcription().prerecorded(source, &options).await?;

    // Extract and print formatted transcript
    // Response path: response.results.channels[0].alternatives[0].transcript
    // Smart formatting enhances the transcript with proper number/date formatting
    let transcript = &response.results.channels[0].alternatives[0].transcript;
    println!("{}", transcript);

    Ok(())
}

// Other useful parameters: .punctuate(true), .paragraphs(true), .utterances(true)