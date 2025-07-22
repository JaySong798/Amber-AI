import { ChatMessage } from "@shared/schema";

// Simple storage interface for chat history and cultural content
// Currently using in-memory storage for this cultural exploration app

export interface IStorage {
  getChatHistory(): Promise<ChatMessage[]>;
  saveChatMessage(message: ChatMessage): Promise<void>;
  clearChatHistory(): Promise<void>;
}

export class MemStorage implements IStorage {
  private chatHistory: ChatMessage[];

  constructor() {
    this.chatHistory = [];
  }

  async getChatHistory(): Promise<ChatMessage[]> {
    return [...this.chatHistory];
  }

  async saveChatMessage(message: ChatMessage): Promise<void> {
    this.chatHistory.push(message);
  }

  async clearChatHistory(): Promise<void> {
    this.chatHistory = [];
  }
}

export const storage = new MemStorage();
