// Test script for AI features
// Run with: node test-ai.js

const testSimplify = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/simplify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: "The Intergovernmental Panel on Climate Change (IPCC) has issued a dire warning about anthropogenic climate change, stating that immediate mitigation strategies must be implemented to avert catastrophic consequences.",
        language: "en"
      })
    });

    const data = await response.json();
    console.log('✅ Simplify API working:');
    console.log('Original length:', data.originalLength);
    console.log('Simplified length:', data.simplifiedLength);
    console.log('Simplified text:', data.simplified);
  } catch (error) {
    console.log('❌ Simplify API error:', error.message);
  }
};

const testSummarize = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "AI Breakthrough in Medical Research",
        content: "Scientists have developed a new artificial intelligence system that can predict patient outcomes with unprecedented accuracy. The system uses machine learning algorithms to analyze medical data and provide personalized treatment recommendations. This breakthrough could revolutionize healthcare delivery worldwide.",
        category: "Science",
        language: "en",
        summaryLength: "medium"
      })
    });

    const data = await response.json();
    console.log('✅ Summarize API working:');
    console.log('Word count:', data.wordCount);
    console.log('Summary:', data.summary);
  } catch (error) {
    console.log('❌ Summarize API error:', error.message);
  }
};

const runTests = async () => {
  console.log('🧪 Testing AI Features...\n');

  console.log('Testing Simplify API:');
  await testSimplify();

  console.log('\nTesting Summarize API:');
  await testSummarize();

  console.log('\n✨ Tests completed!');
};

runTests();