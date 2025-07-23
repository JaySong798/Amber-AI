import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  role: z.enum(['user', 'assistant']),
  timestamp: z.date(),
  structured_response: z.object({
    introduction: z.string(),
    artistic_features: z.array(z.object({
      title: z.string(),
      description: z.string()
    })),
    historical_significance: z.string(),
    cultural_context: z.string(),
    cultural_stories: z.array(z.object({
      title: z.string(),
      story: z.string()
    })),
    follow_up_questions: z.array(z.object({
      question: z.string(),
      description: z.string()
    }))
  }).optional()
});

export const chatRequestSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  language: z.string().optional().default("en")
});

export const chatResponseSchema = z.object({
  id: z.string(),
  content: z.string(),
  structured_response: z.object({
    introduction: z.string(),
    artistic_features: z.array(z.object({
      title: z.string(),
      description: z.string()
    })),
    historical_significance: z.string(),
    cultural_context: z.string(),
    cultural_stories: z.array(z.object({
      title: z.string(),
      story: z.string()
    })),
    follow_up_questions: z.array(z.object({
      question: z.string(),
      description: z.string()
    }))
  })
});

export interface StructuredResponse {
  introduction: string;
  artistic_features: Array<{title: string, description: string}>;
  cultural_context: string;
  cultural_stories: Array<{title: string, story: string}>;
  historical_significance: string;
  follow_up_questions: Array<{question: string}>;
}

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
