# AI Features for The Chronicle

## Overview
The Chronicle now includes advanced AI-powered features to enhance news readability and comprehension:

1. **Language Simplification** - Removes jargon and complex terminology
2. **AI Article Summaries** - Generates concise, intelligent summaries

## Features

### 🧹 Language Simplification
- **Purpose**: Makes complex news articles accessible to broader audiences
- **Technology**: GPT-4 powered text simplification
- **Features**:
  - Removes technical jargon and acronyms
  - Explains complex concepts in simple terms
  - Maintains factual accuracy and journalistic integrity
  - Preserves original meaning and context

### 📝 AI Article Summaries
- **Purpose**: Provides quick, comprehensive overviews of news stories
- **Technology**: GPT-4 powered summarization
- **Features**:
  - Multiple summary lengths (short, medium, long)
  - Category-aware summarization
  - Includes key facts, quotes, and implications
  - Maintains journalistic objectivity

## API Endpoints

### POST `/api/simplify`
Simplifies complex news language by removing jargon.

**Request Body:**
```json
{
  "text": "Article text to simplify",
  "language": "en"
}
```

**Response:**
```json
{
  "simplified": "Simplified version of the text",
  "originalLength": 250,
  "simplifiedLength": 180
}
```

### POST `/api/summarize`
Generates AI-powered article summaries.

**Request Body:**
```json
{
  "title": "Article Title",
  "content": "Full article content",
  "category": "News Category",
  "language": "en",
  "summaryLength": "medium"
}
```

**Response:**
```json
{
  "summary": "AI-generated summary",
  "title": "Article Title",
  "category": "News Category",
  "length": "medium",
  "wordCount": 85,
  "generatedAt": "2026-05-15T10:30:00.000Z"
}
```

## Frontend Integration

### Article Modal (index.html)
- **Simplify Button**: Text wrap icon (ti-text-wrap)
- **Summary Button**: File text icon (ti-file-text)
- **Visual Feedback**: Loading states and AI badges
- **Content Display**: Styled simplified/summary sections

### News Reels (reels.html)
- **Same buttons** integrated into reel action bar
- **Context-aware**: Uses reel headline + summary for processing
- **Inline display**: Shows results within the reel interface

## Usage Examples

### Simplifying Complex News
**Original:** "The Intergovernmental Panel on Climate Change (IPCC) has issued a dire warning about anthropogenic climate change, stating that immediate mitigation strategies must be implemented to avert catastrophic consequences."

**Simplified:** "The IPCC has given a serious warning about climate change caused by human activities. They say we need to take action right away to prevent terrible results."

### AI Summary Generation
**Input:** Long news article about a scientific breakthrough
**Output:** 4-6 sentence summary covering key facts, implications, and context

## Technical Details

### Dependencies
- **OpenAI API**: GPT-4o-mini model
- **Express.js**: Backend API server
- **CORS**: Cross-origin request handling

### Configuration
Set your OpenAI API key in the `.env` file:

```bash
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

**Important:** Replace `your-openai-api-key-here` with your actual OpenAI API key. The AI features will not work without a valid API key.

### Testing Without API Key
If no API key is configured, the APIs will return the original content as fallback. To test with real AI processing:

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your `.env` file
3. Restart the server: `node server.js`
4. Run tests: `node test-ai.js`

### Error Handling
- Graceful fallbacks when AI service unavailable
- User-friendly error messages
- Maintains functionality without AI features

### Performance
- Efficient API calls with appropriate token limits
- Client-side caching considerations
- Optimized for responsive user experience

## Testing

Run the test script to verify API functionality:
```bash
node test-ai.js
```

This will test both simplification and summarization endpoints with sample data.

## Future Enhancements

- **Multi-language support**: Expand beyond English
- **Custom simplification levels**: Basic, intermediate, advanced
- **Summary personalization**: Based on user preferences
- **Offline caching**: Store processed content locally
- **Batch processing**: Handle multiple articles simultaneously

---

*Enhancing news accessibility and comprehension through AI — The Chronicle*