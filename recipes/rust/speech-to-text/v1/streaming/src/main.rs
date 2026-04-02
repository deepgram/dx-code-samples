/*
 * Deepgram Rust SDK: Live Streaming Transcription
 * 
 * This recipe demonstrates real-time speech-to-text streaming over WebSocket
 * connections. Unlike batch/prerecorded transcription, streaming provides
 * immediate transcription results as audio is sent, enabling live applications
 * like captions, voice commands, and real-time analysis.
 */

use std::{env, time::Duration};
use futures::stream::StreamExt;
use deepgram::{Deepgram, common::options::{Encoding, Language, Options}};

static CHUNK_SIZE: usize = 3174;
static FRAME_DELAY: Duration = Duration::from_millis(16);

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // rustls 0.23+ requires a CryptoProvider to be installed before TLS connections
    let _ = rustls::crypto::ring::default_provider().install_default();

    let api_key = env::var("DEEPGRAM_API_KEY")?;
    let dg = Deepgram::new(&api_key)?;

    // Download audio to temp file (streaming requires a local file path)
    let audio = reqwest::get("https://dpgr.am/spacewalk.wav").await?.bytes().await?;
    let tmp = "/tmp/dg_stream.wav";
    tokio::fs::write(tmp, &audio).await?;

    let options = Options::builder()
        .smart_format(true)         // Optional: improve formatting
        .language(Language::en_US)  // <-- THIS demonstrates language specification for streaming
        .build();

    let mut results = dg.transcription()
        .stream_request_with_options(options)
        .encoding(Encoding::Linear16)
        .sample_rate(16000)
        .channels(1)
        .interim_results(true)      // <-- THIS enables real-time partial transcripts
        .file(tmp, CHUNK_SIZE, FRAME_DELAY)
        .await?;

    while let Some(result) = results.next().await {
        println!("{result:?}");
    }

    tokio::fs::remove_file(tmp).await.ok();
    Ok(())
}