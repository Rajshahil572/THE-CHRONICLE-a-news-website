# THE-CHRONICLE-a-news-website

The Chronicle is a premium AI-powered news platform built for fast, modern journalism. It combines editorial-style news storytelling with interactive short-form experiences, audio narration, multi-language support, and AI assistance for smarter reading.

## Project Overview

The Chronicle delivers a polished digital newspaper experience with features shaped for both desktop and mobile audiences:

* Interactive story cards and article modals
* Vertical swipe News Reels for short-form content
* Voice search and audio narration
* AI-powered article simplification and summaries
* Multi-language UI and Google Translate integration
* Dark/light theme toggle
* Smart search, filtering, and saved stories
* Responsive, accessible, and premium editorial styling

## Core Features

### AI-Powered Reading

* **Language Simplification** - removes jargon, explains acronyms, and rewrites complex news text in plain language.
* **AI Article Summaries** - generates concise, category-aware summaries with clear journalistic structure.
* **AI assistant endpoints** - backend support at `/api/simplify` and `/api/summarize`.

### Reader Experience

* **Article modal system** with embedded actions for simplify and summarize.
* **News Reels** - immersive vertical swipe cards for quick highlights.
* **Saved stories** and bookmark interactions.
* **Dynamic story filtering** by category.

### Accessibility & Interactivity

* **Audio mode** using the Web Speech API for narration.
* **Voice search** to query stories hands-free.
* **Dark/light theme** toggle for comfortable reading.
* **Keyboard navigation** and intuitive overlays.

### Language & Translation

* **Multi-language UI** support across menus and navigation.
* **Google Translate integration** for on-page content translation.

### Modern UI

* Premium editorial layout with glassmorphism and refined typography.
* Smooth animations and hover states.
* Responsive mobile-first design.

## Architecture

### Frontend

* `public/index.html` - main news experience, search, categories, AI article tools, voice/audio controls.
* `public/reels.html` - News Reels interface with AI simplify and summary actions.

### Backend

* `server.js` - Express server handling AI proxy requests.
* `test-ai.js` - test script for AI endpoints.

### Configuration

* `.env` - stores `OPENAI_API_KEY` for AI integration.

## Getting Started

### Prerequisites

* Node.js 18+ (or compatible runtime)
* npm
* OpenAI API key

### Install

```bash
npm install
```

### Configure

Create a `.env` file in the project root:

```env
OPENAI_API_KEY=sk-your-openai-api-key-here
```

### Deploy on Netlify

This project can be deployed on Netlify using the static files in `public/` and the serverless API function in `netlify/functions/api.js`.

1. Add `OPENAI_API_KEY` to your Netlify site environment variables.
2. Push the repo to GitHub, GitLab, or another Git provider.
3. On Netlify, create a new site and connect the repository.
4. Netlify will publish `public/` and proxy `/api/*` to the serverless function via `netlify.toml`.

> For local testing, install the Netlify CLI and run `netlify dev` from the project root.

### Run the Server

```bash
node server.js
```

Open your browser at:

```text
http://localhost:8080
```

### Test AI Endpoints

```bash
node test-ai.js
```

This verifies both `/api/simplify` and `/api/summarize`.

## Available Endpoints

* `POST /api/simplify` - simplify article text
* `POST /api/summarize` - generate an AI summary

## Troubleshooting

* If AI requests fail, confirm `OPENAI_API_KEY` is set correctly in `.env`.
* If the server cannot start, ensure `package.json` has `"type": "module"`.
* For browser issues, verify the backend is running on `http://localhost:8080`.

## Tech Stack

* HTML5, CSS3, Vanilla JavaScript
* Node.js, Express.js
* OpenAI GPT-4o-mini
* Web Speech API
* Google Translate widget

## Notes

This project is designed as a foundation for modern digital journalism, blending editorial richness with AI-driven accessibility and short-form news engagement.
