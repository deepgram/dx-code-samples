//! # Diarize - Speaker identification and labeling
//! This recipe demonstrates speaker diarization, which identifies and labels different
//! speakers in audio. With diarization enabled, each word in the transcript includes
//! speaker information, allowing you to track who said what in conversations.

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

    // Enable speaker diarization for speaker identification
    let options = Options::builder()
        .model(Model::CustomId(String::from("nova-3")))
        .diarize(true)     // <-- THIS is the feature this recipe demonstrates
        .punctuate(true)   // Recommended with diarization
        .build();

    // Transcribe with speaker diarization
    let response = dg.transcription().prerecorded(source, &options).await?;

    // Response path: response.results.channels[0].alternatives[0].words
    // Each word has word.speaker: Option<usize> when diarization is enabled
    // speaker may be None if diarization cannot determine the speaker for a word
    let words = &response.results.channels[0].alternatives[0].words;
    let mut current_speaker: Option<usize> = None;
    let mut line = String::new();
    for word in words {
        if word.speaker != current_speaker {
            if !line.is_empty() {
                println!("Speaker {}: {}", current_speaker.unwrap_or(0), line);
                line.clear();
            }
            current_speaker = word.speaker;
        }
        if !line.is_empty() { line.push(' '); }
        line.push_str(&word.word);
    }
    if !line.is_empty() {
        println!("Speaker {}: {}", current_speaker.unwrap_or(0), line);
    }

    Ok(())
}

// Other useful parameters: .utterances(true), .paragraphs(true), .smart_format(true)