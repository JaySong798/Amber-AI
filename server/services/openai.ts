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

// Overarching storytelling and accessibility guidelines
const DUNHUANG_STYLE_GUIDE = `
STORYTELLING APPROACH:
- Use vivid, descriptive language that paints mental pictures
- Employ storytelling techniques to make history come alive
- Create immersive experiences that transport readers to ancient Dunhuang
- Use sensory details (colors, textures, sounds, atmosphere)
- Explain concepts through engaging narratives and analogies

ACCESSIBILITY GUIDELINES:
- Assume no prior knowledge of Dunhuang, Buddhism, or Chinese history
- Define all technical terms and cultural concepts immediately
- Use familiar comparisons to help readers understand unfamiliar ideas
- Structure information logically from general to specific
- Avoid academic jargon; use conversational, engaging tone

CULTURAL IMMERSION:
- Bring the ancient world to life through rich descriptions
- Help readers visualize the bustling Silk Road trade routes
- Describe the daily life of monks, artists, and pilgrims
- Paint pictures of candlelit caves and colorful murals
- Connect ancient practices to universal human experiences
`;

// Individual section generation functions
async function generateIntroduction(userMessage: string, language: string): Promise<string> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Generate a captivating introduction that serves as a gateway into the world of Dunhuang culture. This should be a comprehensive summary that previews the artistic wonders, historical journey, and cultural richness that will be explored in detail later.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Create an engaging overview that:
- Paints a vivid picture of the topic's significance in Dunhuang's story
- Summarizes the artistic elements with descriptive, visual language
- Sets the historical scene with rich context and atmosphere
- Introduces cultural concepts through accessible storytelling
- Defines key terms naturally within engaging descriptions

User's question: ${userMessage}

Write as if guiding a curious traveler into the magical world of ancient Dunhuang. Provide only the introduction text.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 350,
  });

  return response.choices[0].message.content || "";
}

async function generateArtisticFeatures(userMessage: string, language: string): Promise<Array<{title: string, description: string}>> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Bring the artistic wonders of Dunhuang to life through detailed, visually rich descriptions. Focus on concrete artistic elements that readers can visualize and understand, even without prior art knowledge.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Paint vivid pictures of artistic details:
- Visual painting techniques: Describe how ancient brushes moved across walls
- Color palettes: Name specific colors and explain their sources and meanings
- Compositions: Help readers see how elements are arranged in space
- Materials: Describe textures, tools, and craftsmanship methods
- Symbols: Explain iconography through storytelling and cultural context
- Patterns: Describe decorative elements with sensory detail

User's question: ${userMessage}

Write as if describing masterpieces to someone standing before them. Use rich, descriptive language that helps readers visualize these ancient artworks.

Provide a JSON object with this exact format:
{
  "features": [
    {"title": "Feature name", "description": "Vivid, detailed description"},
    {"title": "Feature name", "description": "Vivid, detailed description"},
    {"title": "Feature name", "description": "Vivid, detailed description"}
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 700,
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
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Transport readers through time to understand the historical tapestry of Dunhuang. Tell the story of how this desert oasis became a crossroads of civilizations.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Weave together historical narratives:
- Dynasties and time periods: Bring ancient rulers and their courts to life
- Construction phases: Describe the sounds of chisels carving caves
- Silk Road routes: Paint pictures of caravans crossing vast deserts
- Political patronage: Tell stories of emperors and nobles supporting the arts
- Historical events: Narrate dramatic moments that shaped Dunhuang's fate
- Archaeological discoveries: Share the excitement of modern rediscoveries
- Historical figures: Introduce monks, artists, and pilgrims as real people

User's question: ${userMessage}

Write as if telling the epic story of Dunhuang's place in history to someone around a campfire. Make the past come alive through vivid storytelling.

Provide only the historical significance text (no JSON, no additional formatting).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0].message.content || "";
}

async function generateCulturalBackground(userMessage: string, language: string): Promise<string> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Illuminate the rich spiritual and cultural world of Dunhuang. Help readers understand the beliefs, practices, and cultural exchanges that gave these caves their profound meaning.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Bring cultural traditions to life:
- Buddhist teachings: Explain complex concepts through simple stories and analogies
- Religious ceremonies: Describe incense-filled caves and chanting monks
- Symbolic meanings: Decode artistic symbols through engaging explanations
- Cultural fusion: Tell stories of how different traditions blended together
- Monastic life: Paint pictures of daily life in the desert monastery
- Deities and figures: Introduce spiritual beings as characters with personalities
- Spiritual practices: Describe meditation, pilgrimage, and devotional activities
- Folk traditions: Share how local customs merged with religious practices

User's question: ${userMessage}

Write as if guiding someone through a living spiritual community, making ancient beliefs and practices accessible and meaningful to modern readers.

Provide only the cultural background text (no JSON, no additional formatting).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 500,
  });

  return response.choices[0].message.content || "";
}

async function generateFollowUpQuestions(userMessage: string, language: string): Promise<Array<{question: string, description: string}>> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Create inviting pathways for continued exploration of Dunhuang's wonders. Generate questions that spark curiosity and guide readers toward fascinating discoveries.

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Craft engaging exploration paths:
- Artistic discoveries: Questions about related techniques, styles, or visual elements
- Historical connections: Inquiries about time periods, rulers, or cultural influences
- Cultural mysteries: Questions about meanings, traditions, or spiritual practices
- Comparative exploration: How does this relate to other caves, periods, or cultures?
- Broader journeys: Connections to Silk Road trade, Buddhist teachings, or regional art
- Personal connections: How might ancient practices relate to modern experiences?

User's original question: ${userMessage}

Write questions as if suggesting exciting adventures to a curious traveler. Make each question feel like an invitation to discover something wonderful.

Provide a JSON object with this exact format:
{
  "questions": [
    {"question": "Engaging follow-up question", "description": "Enticing hint or context"},
    {"question": "Engaging follow-up question", "description": "Enticing hint or context"},
    {"question": "Engaging follow-up question", "description": "Enticing hint or context"}
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.8,
    max_tokens: 600,
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
