# Setup Guide for The Chronicle News Website

## 1. Clone the Repository

```bash
git clone https://github.com/Rajshahil572/THE-CHRONICLE-a-news-website.git
cd THE-CHRONICLE-a-news-website
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the project root with the following content:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

- Replace `sk-your-actual-openai-api-key-here` with your OpenAI API key.
- The AI features require this key to work correctly.

## 4. Start the Development Server

```bash
node server.js
```

The server will start on:

```text
http://localhost:8080
```

## 5. Run AI Endpoint Tests

To confirm the AI endpoints are reachable and respond correctly, run:

```bash
node test-ai.js
```

- If the `.env` key is missing, the server will return a clear error message.
- If the key is valid, the test script will verify both `/api/simplify` and `/api/summarize`.

## 6. Frontend Notes

- `public/index.html` includes AI simplify and summary buttons for article modals.
- `public/reels.html` includes AI simplify and summary actions for News Reels.
- The frontend assumes the backend is available at `http://localhost:8080`.

## 7. Troubleshooting

- If you see `OpenAI API key not configured`, confirm `.env` contains a valid `OPENAI_API_KEY`.
- If the server cannot reach OpenAI, verify network connectivity and your API key.
- If the server fails to start because of module syntax, ensure `package.json` includes:

```json
"type": "module"
```

## 8. Optional: GitHub Push

After making changes, commit and push with:

```bash
git add .
git commit -m "Your message"
git push origin main
```
