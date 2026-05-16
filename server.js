import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY || "YOUR_OPENAI_API_KEY";
const isApiKeyConfigured = API_KEY && API_KEY !== "YOUR_OPENAI_API_KEY";
const requireOpenAiKey = (res) => res.status(500).json({
  error: "OpenAI API key not configured. Please set OPENAI_API_KEY in .env and restart the server."
});

if (!isApiKeyConfigured) {
  console.warn("WARNING: OPENAI_API_KEY is not configured or is set to the placeholder value. AI features will not work until a valid key is provided.");
}

app.post("/api/ask", async (req, res) => {
  if (!isApiKeyConfigured) {
    return requireOpenAiKey(res);
  }
  const { question, language } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are The Chronicle AI news assistant. Reply in ${language || "English"} language.`
          },
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();

    res.json({
      answer: data.choices[0].message.content
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      answer: "AI server error"
    });
  }
});

// ================== SIMPLIFY NEWS LANGUAGE ==================
app.post("/api/simplify", async (req, res) => {
  if (!isApiKeyConfigured) {
    return requireOpenAiKey(res);
  }

  const { text, language } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a news language simplifier for The Chronicle. Your task is to remove jargon, complex terminology, and technical language from news articles while maintaining accuracy, journalistic integrity, and readability. 

Rules:
- Replace complex words with simpler alternatives
- Explain acronyms on first use
- Break down technical concepts into everyday language
- Keep the same meaning and facts
- Maintain professional journalistic tone
- Reply in ${language || "English"} language.
- Keep the response concise but complete`
          },
          {
            role: "user",
            content: `Please simplify this news text by removing jargon and complex language: ${text}`
          }
        ],
        max_tokens: 800,
        temperature: 0.3
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI simplify API returned an error:", data);
      return res.status(response.status).json({
        error: data.error?.message || 'OpenAI simplify API error',
        details: data
      });
    }

    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid OpenAI simplify response');
    }

    res.json({
      simplified: data.choices[0].message.content,
      originalLength: text.length,
      simplifiedLength: data.choices[0].message.content.length
    });

  } catch (error) {
    console.error("Simplify API error:", error);
    res.status(500).json({
      error: error.message || "Failed to simplify text",
      simplified: text // fallback to original text
    });
  }
});

// ================== AI ARTICLE SUMMARY ==================
app.post("/api/summarize", async (req, res) => {
  if (!isApiKeyConfigured) {
    return requireOpenAiKey(res);
  }

  const { title, content, category, language, summaryLength } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }

  const lengthMap = {
    short: "2-3 sentences",
    medium: "4-6 sentences",
    long: "8-10 sentences"
  };

  const targetLength = lengthMap[summaryLength] || "4-6 sentences";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an expert news summarizer for The Chronicle. Create concise, accurate summaries that capture the essential facts, context, and implications of news stories.

Rules:
- Focus on who, what, when, where, why, and how
- Include key quotes or statements if relevant
- Maintain journalistic objectivity and balance
- Highlight the most important information first
- Use clear, direct language
- Reply in ${language || "English"} language.
- Create a ${targetLength} summary
- Include the category context: ${category || "General News"}`
          },
          {
            role: "user",
            content: `Title: ${title || "News Article"}
Category: ${category || "General"}
Content: ${content}

Please create a comprehensive summary of this news article.`
          }
        ],
        max_tokens: 600,
        temperature: 0.2
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI summarize API returned an error:", data);
      return res.status(response.status).json({
        error: data.error?.message || 'OpenAI summarize API error',
        details: data
      });
    }

    if (!data.choices || !data.choices[0]) {
      throw new Error('Invalid OpenAI summarize response');
    }

    res.json({
      summary: data.choices[0].message.content,
      title: title,
      category: category,
      length: summaryLength || "medium",
      wordCount: data.choices[0].message.content.split(' ').length,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error("Summarize API error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate summary",
      summary: content.substring(0, 200) + "..." // fallback to truncated content
    });
  }
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});