# Keyword Boosting

This recipe demonstrates keyword boosting, which increases recognition accuracy for specific terms by providing hints to the speech recognition engine. Keyword boosting helps ensure important domain-specific terms, proper nouns, and technical vocabulary are transcribed correctly.

## What it does

Keyword boosting provides the speech recognition engine with a list of important terms and their relative importance weights. This improves accuracy for those specific words, especially useful for industry jargon, proper names, and technical terms that might otherwise be misrecognized.

## Key Parameters

- `keywords(vec!["NASA:2", "spacewalk:1.5"])`: Boosts specific terms with weight values
- `smart_format(true)`: Optional formatting improvements
- `model()`: Optional model selection for better accuracy

## Expected Output

With keyword boosting enabled, you'll see output like:
```
Transcript with keyword boosting: So that was a big step for NASA.
Boosted keyword 'NASA' - confidence: 0.97

Full Response:
{
  "channels": [...],
  ...
}
```

## Prerequisites

- Rust 1.70+
- `DEEPGRAM_API_KEY` environment variable

## Run

```bash
cargo run
```

## Notes

- Keywords appear in normal transcript but with improved accuracy for boosted terms
- Weight values typically range from 0.5 (reduce likelihood) to 2.0+ (increase likelihood)
- Format: `"term:weight"` where higher weights increase recognition likelihood
- Most effective for proper nouns, technical terms, and domain-specific vocabulary
- Use sparingly - too many keywords can reduce overall accuracy