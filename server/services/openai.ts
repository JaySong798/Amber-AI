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
  const prompt = `Generate a comprehensive summary introduction about the user's question regarding Dunhuang culture. This introduction should serve as an overview of the artistic features, historical significance, and cultural background that will be detailed in later sections.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on:
- Brief summary of the artistic elements involved
- Overview of historical context and time period
- Summary of cultural and religious significance
- Key concepts and terminology definition

User's question: ${userMessage}

Provide only the introduction summary text (no JSON, no additional formatting).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 300,
  });

  return response.choices[0].message.content || "";
}

async function generateArtisticFeatures(userMessage: string, language: string): Promise<Array<{title: string, description: string}>> {
  const prompt = `Generate detailed artistic features specifically related to the user's question about Dunhuang culture. Focus on concrete visual elements, techniques, and artistic characteristics.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on specific artistic details:
- Visual painting techniques and brushwork styles
- Color palettes and pigment usage
- Compositional arrangements and spatial design
- Sculptural techniques and materials
- Iconographic elements and symbolic representations
- Decorative patterns and motifs

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
  const prompt = `Generate detailed historical context and significance specifically related to the user's question about Dunhuang culture. Focus on chronological development, political events, and historical impact.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on specific historical details:
- Specific dynasties and time periods (4th-11th centuries)
- Construction dates and historical phases
- Silk Road trade routes and merchant activities
- Political patronage and imperial support
- Historical events that influenced development
- Archaeological discoveries and historical documentation
- Connections to specific rulers, monks, or historical figures

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
  const prompt = `Generate detailed cultural and religious background specifically related to the user's question about Dunhuang culture. Focus on religious practices, cultural meanings, and spiritual contexts.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on specific cultural details:
- Buddhist doctrines and specific sutras depicted
- Religious ceremonies and ritual practices
- Symbolic meanings of artistic elements
- Cultural fusion between Chinese, Indian, and Central Asian traditions
- Monastic life and pilgrimage practices
- Specific deities, bodhisattvas, and religious figures
- Cultural beliefs and spiritual concepts
- Folk traditions and local adaptations

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
  const prompt = `Generate thoughtful follow-up questions that encourage deeper exploration of Dunhuang culture related to the user's original question. Create questions that build naturally from the topic.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus on creating questions that:
- Explore related artistic techniques or styles
- Investigate historical connections and influences
- Examine cultural significance and meanings
- Compare with other Dunhuang sites or periods
- Connect to broader Silk Road or Buddhist themes
- Encourage specific detailed inquiry

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
