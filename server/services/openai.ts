// comment.
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
  cultural_context: string;
  cultural_stories: Array<{
    title: string;
    story: string;
  }>;
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
- Stay under 50 words (part of 500 word total limit)
- Make each sentence vivid and impactful
- Capture the essence without lengthy descriptions
- If the user's question is about a specific topic of dunhuang, introduce that topic first rather than a staring with introductory information about dunhuang itself.
- If the user does not specify a topic, start with a general introduction to dunhuang
- If the user type in sth like a greeting or a casual question, start with a friendly greeting and then introduce dunhuang.

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
    max_tokens: 150, // ~50 words
  });

  return response.choices[0].message.content || "";
}

async function generateArtisticFeatures(introduction: string, language: string): Promise<Array<{title: string, description: string}>> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Based on this introduction: "${introduction}"

Generate ONLY artistic and visual details that expand on the artistic elements mentioned in the introduction.

CRITICAL REQUIREMENTS:
- MAXIMUM 135 words (part of 500 word total limit)
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
- Architectural elements and deisgn features
- Calligraphy styles, structure, stokes, and ink usage


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
    max_tokens: 400, // ~135 words
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
- MAXIMUM 85 words (part of 500 word total limit)
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
- Reflection of the chararcteristics of the society's political, economic, artistic, and cultural development
- Do not mention the specific time periods of the dynasties (e.g., 300-400 AD)

Avoid mentioning: artistic techniques, visual descriptions, religious practices, or cultural meanings.

Write as if creating a historical timeline, focusing purely on when, who, and what happened.
End with a concluding sentence that summarizes the historical significance with a full stop.

Provide only the historical significance text (no JSON, no additional formatting).`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 250, // ~85 words
  });

  return response.choices[0].message.content || "";
}

async function generateCulturalContent(introduction: string, language: string): Promise<{context: string, stories: Array<{title: string, story: string}>}> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Based on this introduction: "${introduction}"

Generate both cultural context and 3 cultural stories related to the topic.

CRITICAL REQUIREMENTS:
- MAXIMUM 185 words total (original 85 + additional 100 words, part of 600 word total limit)
- Cultural context: ~80 words providing spiritual and religious background
- 3 Cultural stories: ~35 words each (~105 words total for all stories)
- Focus on Buddhist culture, Chinese folklore, and spiritual traditions
- Ensure JSON is properly formatted and complete

IMPORTANT: Respond in ${language === 'zh' ? 'Chinese' : 'English'}.

CULTURAL CONTEXT should cover:
- Buddhist teachings and spiritual significance
- Religious practices and ceremonial importance
- Cultural traditions and spiritual heritage
- Symbolic meanings and sacred narratives

3 CULTURAL STORIES should include:
- Buddhist legends and spiritual tales
- Chinese folktales and mythologies
- Cultural legends connected to Dunhuang or the topic
- Stories about spiritual journeys and transformations
- Tales of cultural heroes and wisdom

Each story should be a complete mini-narrative with beginning, middle, and end.
End cultural context and each story with a concluding sentence with a full stop.

Provide a JSON object with this exact format (ensure complete, valid JSON):
{
  "context": "Cultural and spiritual background with concluding sentence.",
  "stories": [
    {"title": "Story Title 1", "story": "Complete cultural story or tale with concluding sentence."},
    {"title": "Story Title 2", "story": "Complete cultural story or tale with concluding sentence."},
    {"title": "Story Title 3", "story": "Complete cultural story or tale with concluding sentence."}
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.7,
    max_tokens: 555, // ~185 words
  });

  const content = response.choices[0].message.content;
  if (!content) return { context: "", stories: [] };
  
  try {
    const parsed = JSON.parse(content);
    return {
      context: parsed.context || "",
      stories: parsed.stories || []
    };
  } catch (error) {
    console.error("Error parsing cultural content JSON:", error);
    console.error("Raw content:", content);
    // Return fallback structure if JSON parsing fails
    return {
      context: "Cultural context will be displayed here.",
      stories: [{ title: "Cultural Tales", story: "Cultural stories will be displayed here." }]
    };
  }
}

async function generateFollowUpQuestions(sectionsContent: any, language: string): Promise<Array<{question: string, description: string}>> {
  const prompt = `${DUNHUANG_STYLE_GUIDE}

Based on these sections:
Introduction: "${sectionsContent.introduction}"
Artistic Features: "${JSON.stringify(sectionsContent.artistic_features)}"
Historical Context: "${sectionsContent.historical_significance}"
Cultural Content: "${JSON.stringify(sectionsContent.cultural_content)}"

Generate short, concise follow-up questions (maximum 8-10 words each) that build directly from the specific content covered in these sections.

CRITICAL REQUIREMENTS:
- MAXIMUM 65 words for this entire section (part of 500 word total limit)
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
    max_tokens: 200, // ~65 words
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
    // CRITICAL: Entire response must stay under 600 words total (1800 tokens ÷ 3)
    // Introduction: ~50 words, Artistic: ~135 words, Historical: ~85 words, Cultural: ~185 words (context + stories), Questions: ~65 words
    console.log("Generating response with 600 word limit for:", userMessage);
    
    // First generate the introduction
    const introduction = await generateIntroduction(userMessage, language);
    
    // Then generate other sections based on the introduction
    const [
      artistic_features,
      historical_significance,
      cultural_content
    ] = await Promise.all([
      generateArtisticFeatures(introduction, language),
      generateHistoricalSignificance(introduction, language),
      generateCulturalContent(introduction, language)
    ]);

    // Finally generate follow-up questions based on all sections
    const sectionsContent = {
      introduction,
      artistic_features,
      historical_significance,
      cultural_content
    };
    
    const follow_up_questions = await generateFollowUpQuestions(sectionsContent, language);

    const normalizedResponse: DunhuangResponse = {
      introduction: introduction || "Welcome to exploring Dunhuang culture.",
      artistic_features: Array.isArray(artistic_features) ? artistic_features : [],
      historical_significance: historical_significance || "Historical context will be provided.",
      cultural_context: cultural_content.context || "Cultural context will be provided.",
      cultural_stories: Array.isArray(cultural_content.stories) ? cultural_content.stories : [],
      follow_up_questions: Array.isArray(follow_up_questions) ? follow_up_questions : []
    };

    console.log("Response generated within 1800 token limit");
    return normalizedResponse;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response from AI service: " + (error as Error).message);
  }
}
