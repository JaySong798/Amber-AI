import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Message } from "./message";
import { LoadingMessage } from "./loading-message";
import { ChatMessage } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";

interface ChatInterfaceProps {
  messages: ChatMessage[];
  setMessages: (messages: ChatMessage[]) => void;
}

export function ChatInterface({ messages, setMessages }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message, language: "en" });
      return response.json();
    },
    onSuccess: (data) => {
      const assistantMessage: ChatMessage = {
        id: data.id,
        content: data.content,
        role: 'assistant',
        timestamp: new Date(),
        structured_response: data.structured_response
      };
      setMessages([...messages, assistantMessage]);
    },
    onError: (error) => {
      toast({
        title: "Connection Error",
        description: "Unable to connect to the AI service. Please check your connection and try again.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sendMessage.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    sendMessage.mutate(input.trim());
    setInput("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
    textareaRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-card/50">
      {/* Chat Header */}
      <div className="border-b border-imperial-gold-200 p-4 lg:p-6 bg-imperial-gold-100/40 silk-texture backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-deep-bronze-800">Dunhuang Cultural Explorer</h2>
            <p className="text-sm text-deep-bronze-600">Ask me anything about Dunhuang art, history, and culture</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-deep-bronze-500">
            <div className="w-2 h-2 bg-turquoise-blue-400 rounded-full animate-pulse"></div>
            <span className="font-medium">AI Ready</span>
          </div>
        </div>
      </div>
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6 scroll-smooth bg-warm-cream-50/30 tang-imperial-pattern">
        {/* Welcome Message */}
        <div className="chat-message">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-tang-red-500 to-turquoise-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="bg-warm-cream-100/80 border border-imperial-gold-200 rounded-lg p-4 section-card">
                <div className="break-words leading-relaxed">
                  <p className="text-sm text-deep-bronze-700 font-medium">Welcome! I'm your AI guide to the magnificent world of Dunhuang. I can help you explore:</p>
                  <ul className="mt-3 space-y-1 text-sm text-deep-bronze-600">
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-turquoise-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Cave frescoes and their meanings
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-turquoise-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Calligraphy styles and techniques
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-turquoise-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Historical context and cultural significance
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 text-turquoise-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Buddhist and religious symbolism
                    </li>
                  </ul>
                </div>
              </div>
              <span className="text-xs text-deep-bronze-500 mt-1 block font-medium">Amber AI • Just now</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        {messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
            onQuestionClick={handleQuestionClick}
          />
        ))}

        {/* Loading Message */}
        {sendMessage.isPending && <LoadingMessage />}

        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat Input Area */}
      <div className="border-t border-imperial-gold-200 p-4 lg:p-6 bg-card/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-end space-x-3">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={1}
                className="resize-none min-h-[48px] max-h-[120px] border-imperial-gold-300 bg-warm-cream-100/50 text-deep-bronze-800 placeholder:text-deep-bronze-500 focus:ring-2 focus:ring-turquoise-blue-500 focus:border-turquoise-blue-500"
                placeholder="Ask me about Dunhuang art, history, or culture..."
                disabled={sendMessage.isPending}
              />
            </div>
            <Button 
              type="submit" 
              disabled={!input.trim() || sendMessage.isPending}
              className="bg-turquoise-blue-500 hover:bg-turquoise-blue-600 text-white px-6 py-3 shadow-sm focus:ring-2 focus:ring-turquoise-blue-500 focus:ring-offset-2"
            >
              <Send className="w-4 h-4 mr-2 sm:mr-0" />
              <span className="hidden sm:inline">Send</span>
            </Button>
          </form>
          
          {/* Quick Suggestions */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="px-3 py-1 bg-warm-cream-200/60 hover:bg-warm-cream-300 text-deep-bronze-700 border border-imperial-gold-300/50 rounded-full text-xs h-auto font-medium transition-all duration-200"
              onClick={() => handleQuestionClick("Explain Buddhist symbolism in Cave 17")}
            >
              Cave 17 symbolism
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 py-1 bg-tang-red-100/60 hover:bg-tang-red-200 text-tang-red-700 border border-tang-red-200/50 rounded-full text-xs h-auto font-medium transition-all duration-200"
              onClick={() => handleQuestionClick("Compare Tang and Song dynasty art styles")}
            >
              Tang vs Song styles
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="px-3 py-1 bg-turquoise-blue-100/60 hover:bg-turquoise-blue-200 text-turquoise-blue-700 border border-turquoise-blue-200/50 rounded-full text-xs h-auto font-medium transition-all duration-200"
              onClick={() => handleQuestionClick("What is the Library Cave discovery?")}
            >
              Library Cave
            </Button>
          </div>
          
          <p className="text-xs text-deep-bronze-500 mt-3 text-center flex items-center justify-center font-medium">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Responses generated by AI. Cultural information is researched but should be verified for academic use.
          </p>
        </div>
      </div>
    </main>
  );
}
