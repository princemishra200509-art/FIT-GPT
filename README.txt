======================================
    FIT GPT - Setup Guide
======================================

📁 FOLDER STRUCTURE:
fitgpt/
├── server.js          ← Backend (API key yahan hai)
├── package.json       ← Dependencies
├── .env.example       ← Key ka example
└── public/
    └── index.html     ← Frontend (key nahi hai yahan)

======================================
STEP 1 — Node.js Install Karo
======================================
👉 nodejs.org pe jao aur download karo
   (LTS version lo)

======================================
STEP 2 — API Key Daalo
======================================
server.js file kholo aur line dhundho:
const GEMINI_API_KEY = 'APNI_KEY_YAHAN_DAALO';

Wahan apni key daalo:
const GEMINI_API_KEY = 'AIzaSy...tumhari_key';

======================================
STEP 3 — Dependencies Install Karo
======================================
Terminal/CMD mein fitgpt folder mein jao:

  cd fitgpt
  npm install

======================================
STEP 4 — Server Chalao
======================================
  node server.js

Browser mein kholo:
  http://localhost:3000

======================================
✅ Ab API key HTML mein nahi dikhegi!
   Sirf server.js mein hogi jo private hai.
======================================
