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

Generate a concise introduction that serves as a gateway into the world of Dunhuang culture. 

CRITICAL REQUIREMENTS:
- MAXIMUM 3-5 sentences only
- Stay under 150 tokens (part of 1500 token total limit)
- Make each sentence vivid and impactful
- Capture the essence without lengthy descriptions

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Create a brief but engaging overview that:
- Paints a vivid picture of the topic's significance in Dunhuang's story
- Introduces the key concept with descriptive language
- Sets the scene with rich atmosphere in minimal words

User's question: ${userMessage}

Write as if providing a captivating but brief introduction. Maximum 3-5 sentences only.
End with a concluding sentence that summarizes the introduction with a full stop.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 150,
  });

  return response.choices[0].message.content || "";
}

async function generateArtisticFeatures(introduction: string, language: string): Promise<Array<{title: string, description: string}>> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Based on this introduction: "${introduction}"

Generate ONLY artistic and visual details that expand on the artistic elements mentioned in the introduction.

CRITICAL REQUIREMENTS:
- MAXIMUM 400 tokens (part of 1500 token total limit)
- Stay concise while being informative
- Focus exclusively on concrete visual elements, techniques, and artistic characteristics
- Do not repeat general information about locations, time periods, or cultural background
- Ensure JSON is properly formatted and complete

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus ONLY on visual artistic details:
- Specific painting techniques and brushwork methods
- Exact color palettes and pigment materials used
- Detailed compositional arrangements and layouts
- Sculptural techniques and carving methods
- Iconographic symbols and their visual representations
- Decorative patterns and artistic motifs

Avoid mentioning: historical periods, dynasties, cultural background, religious context, or general introductions.

Write as if examining the artwork up close, describing only what the eyes can see.
End each description with a concluding sentence that summarizes the artistic technique with a full stop.

Provide a JSON object with this exact format (ensure complete, valid JSON):
{
  "features": [
    {"title": "Specific artistic technique", "description": "Pure visual description with concluding summary sentence."},
    {"title": "Specific artistic technique", "description": "Pure visual description with concluding summary sentence."},
    {"title": "Specific artistic technique", "description": "Pure visual description with concluding summary sentence."}
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 400,
  });

  const content = response.choices[0].message.content;
  if (!content) return [];
  
  try {
    const parsed = JSON.parse(content);
    return parsed.features || [];
  } catch (error) {
    console.error("Error parsing artistic features JSON:", error);
    console.error("Raw content:", content);
    // Return fallback structure if JSON parsing fails
    return [
      { title: "Visual Elements", description: "Artistic features will be displayed here." }
    ];
  }
}

async function generateHistoricalSignificance(introduction: string, language: string): Promise<string> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Based on this introduction: "${introduction}"

Generate ONLY historical context and chronological details that expand on the historical elements mentioned in the introduction. 

CRITICAL REQUIREMENTS:
- MAXIMUM 250 tokens (part of 1500 token total limit)
- Stay concise while being informative
- Focus exclusively on dates, dynasties, events, and historical developments
- Do not repeat artistic details, cultural practices, or general background information

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus ONLY on historical facts and chronology:
- Specific dynasties and exact time periods
- Construction dates and building phases
- Political events and imperial patronage
- Archaeological discoveries and documentation
- Historical figures and their specific contributions
- Timeline of development and changes

Avoid mentioning: artistic techniques, visual descriptions, religious practices, or cultural meanings.

Write as if creating a historical timeline, focusing purely on when, who, and what happened.
End with a concluding sentence that summarizes the historical significance with a full stop.

Provide only the historical significance text (no JSON, no additional formatting).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 250,
  });

  return response.choices[0].message.content || "";
}

async function generateCulturalBackground(introduction: string, language: string): Promise<string> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Based on this introduction: "${introduction}"

Generate ONLY cultural and religious context that expands on the spiritual elements mentioned in the introduction.

CRITICAL REQUIREMENTS:
- MAXIMUM 250 tokens (part of 1500 token total limit)
- Stay concise while being informative
- Focus exclusively on beliefs, practices, and spiritual meanings
- Do not repeat historical dates, artistic techniques, or general background information

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Focus ONLY on cultural and spiritual aspects:
- Buddhist teachings and specific doctrines
- Religious ceremonies and ritual practices
- Spiritual symbolism and sacred meanings
- Monastic life and religious communities
- Pilgrimage traditions and devotional practices
- Cultural fusion and religious syncretism
- Sacred stories and spiritual narratives

Avoid mentioning: specific dates, dynasties, artistic techniques, or visual descriptions.

Write as if explaining the spiritual heart and soul behind the subject, focusing purely on beliefs and practices.
End with a concluding sentence that summarizes the cultural story with a full stop.

Provide only the cultural background text (no JSON, no additional formatting).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 250,
  });

  return response.choices[0].message.content || "";
}

async function generateFollowUpQuestions(sectionsContent: any, language: string): Promise<Array<{question: string, description: string}>> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Based on these sections:
Introduction: "${sectionsContent.introduction}"
Artistic Features: "${JSON.stringify(sectionsContent.artistic_features)}"
Historical Context: "${sectionsContent.historical_significance}"
Cultural Background: "${sectionsContent.cultural_background}"

Generate short, concise follow-up questions (maximum 8-10 words each) that build directly from the specific content covered in these sections.

CRITICAL REQUIREMENTS:
- MAXIMUM 200 tokens for this entire section (part of 1500 token total limit)
- Each question maximum 8-10 words
- Stay focused on specific content mentioned

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

Create 3-4 brief questions covering:
- One artistic question based on the artistic features mentioned
- One historical question based on the historical context provided
- One cultural question based on the cultural background covered
- One comparative or related exploration question

Keep questions short and specific. Descriptions should be equally concise (maximum 15 words).
End each description with a concluding phrase that summarizes the exploration opportunity with a full stop.

Provide a JSON object with this exact format:
{
  "questions": [
    {"question": "Short specific question?", "description": "Brief hint"},
    {"question": "Short specific question?", "description": "Brief hint"},
    {"question": "Short specific question?", "description": "Brief hint"}
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.8,
    max_tokens: 200,
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
    // CRITICAL: Entire response must stay under 1500 tokens total
    // Introduction: ~150 tokens, Artistic: ~400 tokens, Historical: ~250 tokens, Cultural: ~250 tokens, Questions: ~200 tokens
    console.log("Generating response with 1500 token limit for:", userMessage);
    
    // First generate the introduction
    const introduction = await generateIntroduction(userMessage, language);
    
    // Then generate other sections based on the introduction
    const [
      artistic_features,
      historical_significance,
      cultural_background
    ] = await Promise.all([
      generateArtisticFeatures(introduction, language),
      generateHistoricalSignificance(introduction, language),
      generateCulturalBackground(introduction, language)
    ]);

    // Finally generate follow-up questions based on all sections
    const sectionsContent = {
      introduction,
      artistic_features,
      historical_significance,
      cultural_background
    };
    
    const follow_up_questions = await generateFollowUpQuestions(sectionsContent, language);

    const normalizedResponse: DunhuangResponse = {
      introduction: introduction || "Welcome to exploring Dunhuang culture.",
      artistic_features: Array.isArray(artistic_features) ? artistic_features : [],
      historical_significance: historical_significance || "Historical context will be provided.",
      cultural_background: cultural_background || "Cultural context will be provided.",
      follow_up_questions: Array.isArray(follow_up_questions) ? follow_up_questions : []
    };

    console.log("Response generated within 1500 token limit");
    return normalizedResponse;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response from AI service: " + (error as Error).message);
  }
}
