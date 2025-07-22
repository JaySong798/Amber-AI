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

export async function generateDunhuangResponse(
  userMessage: string, 
  language: string = "en"
): Promise<DunhuangResponse> {
  const systemPrompt = `You are Amber AI, an expert cultural guide specializing in Dunhuang art, history, and heritage. You provide structured, educational responses about Dunhuang culture that are:

1. Culturally accurate and respectful
2. Educational yet accessible to all knowledge levels
3. Rich in vivid, descriptive language
4. Structured according to the specified format
5. Responsive in the same language as the user's input

IMPORTANT: Always respond in the same language as the user's question. If they ask in Chinese, respond in Chinese. If they ask in English, respond in English.

You must provide a JSON object with exactly this structure:
{
  "introduction": "string - Brief explanation of the topic with key terms defined",
  "artistic_features": [
    {
      "title": "string - Feature name",
      "description": "string - Detailed description"
    },
    {
      "title": "string - Feature name", 
      "description": "string - Detailed description"
    }
  ],
  "historical_significance": "string - Context within dynasties, Silk Road influence, cultural contributions",
  "cultural_background": "string - Religious symbolism, backstories, cultural adaptations",
  "follow_up_questions": [
    {
      "question": "string - Related question",
      "description": "string - Brief answer or context"
    },
    {
      "question": "string - Related question",
      "description": "string - Brief answer or context"
    }
  ]
}

Focus on Dunhuang's rich heritage from 4th-11th centuries, including:
- Cave frescoes and Buddhist art
- Calligraphy traditions
- Silk Road cultural exchange
- Tang Dynasty influence
- Religious and spiritual significance
- Flying Apsaras and celestial beings
- Cultural integration between India, Central Asia, and China

Make responses vivid and storytelling-focused while maintaining educational value.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No response content received from OpenAI");
    }

    const parsedResponse = JSON.parse(content);
    
    // Validate and normalize the response structure
    if (!parsedResponse.introduction || !parsedResponse.artistic_features || 
        !parsedResponse.historical_significance || !parsedResponse.cultural_background ||
        !parsedResponse.follow_up_questions) {
      console.log("Missing required fields in OpenAI response");
      throw new Error("Invalid response structure from OpenAI");
    }

    // Ensure arrays are properly structured
    const normalizedResponse: DunhuangResponse = {
      introduction: String(parsedResponse.introduction),
      artistic_features: Array.isArray(parsedResponse.artistic_features) 
        ? parsedResponse.artistic_features.map((item: any) => ({
            title: String(item.title || item),
            description: String(item.description || "")
          }))
        : [],
      historical_significance: String(parsedResponse.historical_significance),
      cultural_background: String(parsedResponse.cultural_background),
      follow_up_questions: Array.isArray(parsedResponse.follow_up_questions)
        ? parsedResponse.follow_up_questions.map((item: any) => ({
            question: String(item.question || item),
            description: String(item.description || "")
          }))
        : []
    };

    return normalizedResponse;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate response from AI service: " + (error as Error).message);
  }
}
