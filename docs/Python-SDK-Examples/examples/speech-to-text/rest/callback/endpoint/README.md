### Speech to Text — Minimal HTTPS callback endpoint

**Learning objective**: Run a simple local HTTPS server to receive Deepgram callback payloads.

#### Prerequisites
- **Python**: 3.10+
- Local certificate/key files: `localhost.crt` and `localhost.key`

#### Run
```bash
cd sources/Python-SDK-Examples/examples/speech-to-text/rest/callback/endpoint
python main.py
```

#### Key points
- Uses `http.server` with TLS to accept POSTs on `https://localhost:8000`.
- Pair with the callback sender example to see transcriptions delivered to your server.