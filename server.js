const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// ⚠️ SIRF YAHAN APNI API KEY DAALO — HTML mein nahi dikhegi
const GEMINI_API_KEY = AQ.Ab8RN6LPCyd7AuJZs5w-AiJVNE8V2XN5fkTQkekqtKaVRC38Sw;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// HTML file serve karo
app.use(express.static(path.join(__dirname, 'public')));

// ── Proxy Route — Text ─────────────────────────────────────────
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt missing' });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 1200 }
        })
      }
    );

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
    res.json({ result: text });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

// ── Proxy Route — Vision (Photo) ───────────────────────────────
app.post('/api/gemini-vision', async (req, res) => {
  try {
    const { prompt, base64, mimeType } = req.body;
    if (!prompt || !base64) return res.status(400).json({ error: 'Data missing' });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { inline_data: { mime_type: mimeType, data: base64 } },
              { text: prompt }
            ]
          }],
          generationConfig: { maxOutputTokens: 1200 }
        })
      }
    );

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
    res.json({ result: text });

  } catch (err) {
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ FIT GPT Server chal raha hai: http://localhost:${PORT}`);
});
