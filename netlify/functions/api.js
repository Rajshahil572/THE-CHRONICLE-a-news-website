export async function handler(event) {
  const openAiKey = process.env.OPENAI_API_KEY;
  const isApiKeyConfigured = !!openAiKey;

  const path = event.path || event.rawPath || '';
  const route = path.replace(/^\/api/, '') || '/';
  const method = event.httpMethod || event.requestContext?.http?.method;

  if (!isApiKeyConfigured) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'OpenAI API key not configured. Set OPENAI_API_KEY in Netlify environment variables.'
      })
    };
  }

  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  let body = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body' })
    };
  }

  const openAiRequest = async (messages, max_tokens = 600, temperature = 0.3) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens,
        temperature
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'OpenAI request failed');
    }
    return data;
  };

  try {
    if (route === '/ask') {
      const { question, language } = body;
      if (!question) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Question is required' }) };
      }
      const response = await openAiRequest([
        {
          role: 'system',
          content: `You are The Chronicle AI news assistant. Reply in ${language || 'English'} language.`
        },
        { role: 'user', content: question }
      ], 300, 0.5);
      return {
        statusCode: 200,
        body: JSON.stringify({ answer: response.choices?.[0]?.message?.content || '' })
      };
    }

    if (route === '/simplify') {
      const { text, language } = body;
      if (!text) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Text is required' }) };
      }
      const response = await openAiRequest([
        {
          role: 'system',
          content: `You are a news language simplifier for The Chronicle. Your task is to remove jargon, complex terminology, and technical language from news articles while maintaining accuracy, journalistic integrity, and readability.

Rules:
- Replace complex words with simpler alternatives
- Explain acronyms on first use
- Break down technical concepts into everyday language
- Keep the same meaning and facts
- Maintain professional journalistic tone
- Reply in ${language || 'English'} language.
- Keep the response concise but complete`
        },
        {
          role: 'user',
          content: `Please simplify this news text by removing jargon and complex language: ${text}`
        }
      ], 800, 0.3);

      return {
        statusCode: 200,
        body: JSON.stringify({
          simplified: response.choices?.[0]?.message?.content || '',
          originalLength: text.length,
          simplifiedLength: response.choices?.[0]?.message?.content?.length || 0
        })
      };
    }

    if (route === '/summarize') {
      const { title, content, category, language, summaryLength } = body;
      if (!content) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Content is required' }) };
      }

      const lengthMap = {
        short: '2-3 sentences',
        medium: '4-6 sentences',
        long: '8-10 sentences'
      };
      const targetLength = lengthMap[summaryLength] || '4-6 sentences';

      const response = await openAiRequest([
        {
          role: 'system',
          content: `You are an expert news summarizer for The Chronicle. Create concise, accurate summaries that capture the essential facts, context, and implications of news stories.

Rules:
- Focus on who, what, when, where, why, and how
- Include key quotes or statements if relevant
- Maintain journalistic objectivity and balance
- Highlight the most important information first
- Use clear, direct language
- Reply in ${language || 'English'} language.
- Create a ${targetLength} summary
- Include the category context: ${category || 'General News'}`
        },
        {
          role: 'user',
          content: `Title: ${title || 'News Article'}\nCategory: ${category || 'General'}\nContent: ${content}\n\nPlease create a comprehensive summary of this news article.`
        }
      ], 600, 0.2);

      const summaryText = response.choices?.[0]?.message?.content || '';
      return {
        statusCode: 200,
        body: JSON.stringify({
          summary: summaryText,
          title,
          category,
          length: summaryLength || 'medium',
          wordCount: summaryText.split(' ').filter(Boolean).length,
          generatedAt: new Date().toISOString()
        })
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };
  } catch (error) {
    console.error('Netlify Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Server error' })
    };
  }
}
