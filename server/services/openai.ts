import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface DunhuangResponse {
  introduction: string;
  artistic_features: Array<{
    title: string;
    description: string;
  }>;
  historical_significance: string;
  cultural_background: string;
  follow_up_questions: Array<{
    question: string;
    description: string;
  }>;
}

// Individual section generation functions
async function generateIntroduction(userMessage: string, language: string): Promise<string> {
  const prompt = `You are an expert Dunhuang cultural guide. Generate a brief, engaging introduction to the user's question about Dunhuang culture.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on:
- Key terms and concepts definition
- Setting context for the topic
- Capturing the reader's interest
- Brief overview of what will be covered

User's question: ${userMessage}

Provide only the introduction text (no JSON, no additional formatting).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 300,
  });

  return response.choices[0].message.content || "";
}

async function generateArtisticFeatures(userMessage: string, language: string): Promise<Array<{title: string, description: string}>> {
  const prompt = `You are an expert in Dunhuang art and visual culture. Generate 3-4 key artistic features related to the user's question.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on:
- Visual techniques and styles
- Materials and methods
- Artistic symbolism
- Unique characteristics

User's question: ${userMessage}

Provide a JSON object with this exact format:
{
  "features": [
    {"title": "Feature name", "description": "Detailed description"},
    {"title": "Feature name", "description": "Detailed description"},
    {"title": "Feature name", "description": "Detailed description"}
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 600,
  });

  const content = response.choices[0].message.content;
  if (!content) return [];
  
  try {
    const parsed = JSON.parse(content);
    return parsed.features || [];
  } catch (error) {
    console.error("Error parsing artistic features JSON:", error);
    return [];
  }
}

async function generateHistoricalSignificance(userMessage: string, language: string): Promise<string> {
  const prompt = `You are a historian specializing in ancient Chinese culture and the Silk Road. Generate historical context and significance for the user's question about Dunhuang.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on:
- Historical timeline and dynasties (4th-11th centuries)
- Silk Road connections and cultural exchange
- Political and social context
- Impact on Chinese and world culture
- Key historical figures or events

User's question: ${userMessage}

Provide only the historical significance text (no JSON, no additional formatting).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.6,
    max_tokens: 400,
  });

  return response.choices[0].message.content || "";
}

async function generateCulturalBackground(userMessage: string, language: string): Promise<string> {
  const prompt = `You are an expert in Buddhist culture and Chinese religious traditions. Generate cultural and religious background information for the user's question about Dunhuang.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on:
- Religious symbolism and meaning
- Buddhist teachings and stories
- Cultural traditions and practices
- Spiritual significance
- Cross-cultural influences from India and Central Asia
- Legends and folklore

User's question: ${userMessage}

Provide only the cultural background text (no JSON, no additional formatting).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 400,
  });

  return response.choices[0].message.content || "";
}

async function generateFollowUpQuestions(userMessage: string, language: string): Promise<Array<{question: string, description: string}>> {
  const prompt = `You are an educational guide for Dunhuang culture. Generate 3-4 thoughtful follow-up questions that would naturally extend the user's learning journey.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on:
- Questions that build on the current topic
- Different aspects of Dunhuang culture
- Encouraging deeper exploration
- Connecting to broader themes

User's original question: ${userMessage}

Provide a JSON object with this exact format:
{
  "questions": [
    {"question": "Follow-up question", "description": "Brief context or hint"},
    {"question": "Follow-up question", "description": "Brief context or hint"},
    {"question": "Follow-up question", "description": "Brief context or hint"}
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.8,
    max_tokens: 500,
  });

  const content = response.choices[0].message.content;
  if (!content) return [];
  
  try {
    const parsed = JSON.parse(content);
    return parsed.questions || [];
  } catch (error) {
    console.error("Error parsing follow-up questions JSON:", error);
    return [];
  }
}

export async function generateDunhuangResponse(
  userMessage: string, 
  language: string = "en"
): Promise<DunhuangResponse> {
  try {
    // Generate all sections in parallel for better performance
    const [
      introduction,
      artistic_features,
      historical_significance,
      cultural_background,
      follow_up_questions
    ] = await Promise.all([
      generateIntroduction(userMessage, language),
      generateArtisticFeatures(userMessage, language),
      generateHistoricalSignificance(userMessage, language),
      generateCulturalBackground(userMessage, language),
      generateFollowUpQuestions(userMessage, language)
    ]);

    const normalizedResponse: DunhuangResponse = {
      introduction: introduction || "Welcome to exploring Dunhuang culture.",
      artistic_features: Array.isArray(artistic_features) ? artistic_features : [],
      historical_significance: historical_significance || "Dunhuang holds significant historical importance in Chinese culture.",
      cultural_background: cultural_background || "Dunhuang represents a rich tapestry of cultural traditions.",
      follow_up_questions: Array.isArray(follow_up_questions) ? follow_up_questions : []
    };

    return normalizedResponse;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response from AI service: " + (error as Error).message);
  }
}
