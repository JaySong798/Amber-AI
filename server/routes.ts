import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { chatRequestSchema, chatResponseSchema } from "@shared/schema";
import { generateDunhuangResponse } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat endpoint for Dunhuang cultural exploration
  app.post("/api/chat", async (req, res) => {
    try {
      // Validate request body
      const validatedData = chatRequestSchema.parse(req.body);
      const { message, language } = validatedData;

      // Generate AI response
      const aiResponse = await generateDunhuangResponse(message, language);

      // Create response object
      const response = {
        id: Date.now().toString(),
        content: aiResponse.introduction, // Fallback content
        structured_response: aiResponse
      };

      // Validate response before sending
      const validatedResponse = chatResponseSchema.parse(response);
      
      res.json(validatedResponse);
    } catch (error) {
      console.error("Chat API error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid request format",
          errors: error.errors 
        });
      }

      if (error instanceof Error) {
        if (error.message.includes("OpenAI") || error.message.includes("AI service")) {
          return res.status(503).json({ 
            message: "AI service temporarily unavailable. Please try again later." 
          });
        }
      }

      res.status(500).json({ 
        message: "Internal server error. Please try again." 
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      service: "Amber AI Dunhuang Explorer"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
