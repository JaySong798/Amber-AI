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
    <main className="flex-1 flex flex-col bg-neutral-50">
      {/* Chat Header */}
      <div className="border-b border-neutral-200 p-6 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-orange-500 to-dark-turquoise-500 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 text-white font-bold text-lg">A</div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-neutral-800">Amber AI</h1>
              <p className="text-sm text-neutral-600">Dunhuang Cultural Explorer</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center text-sm text-neutral-600 bg-neutral-100 px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Online
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center space-y-6 py-20">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-orange-500 to-dark-turquoise-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                <div className="w-10 h-10 text-white font-bold text-xl">A</div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-neutral-800 mb-4">
                  Explore Dunhuang Culture
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
                  Discover the fascinating world of ancient Chinese art and heritage through AI-powered conversations. Ask about cave paintings, Buddhist traditions, or Silk Road history.
                </p>
              </div>
            </div>
          )}

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
      </div>
      
      {/* Chat Input Area */}
      <div className="border-t border-neutral-200 bg-white p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Dunhuang's art, history, or cultural significance..."
              className="flex-1 min-h-[60px] max-h-32 resize-none bg-neutral-50 border-neutral-300 focus:border-dark-turquoise-500 focus:ring-dark-turquoise-500/20 rounded-lg text-base"
              disabled={sendMessage.isPending}
            />
            <Button
              type="submit"
              disabled={sendMessage.isPending || !input.trim()}
              size="lg"
              className="self-end h-[60px] px-6 bg-yellow-orange-500 hover:bg-yellow-orange-600 text-white rounded-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          
          {messages.length === 0 && (
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <button
                className="px-4 py-2 bg-white border border-neutral-300 hover:border-neutral-400 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                onClick={() => handleQuestionClick("Explain Buddhist symbolism in Cave 17")}
              >
                Cave 17 symbolism
              </button>
              <button
                className="px-4 py-2 bg-white border border-neutral-300 hover:border-neutral-400 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                onClick={() => handleQuestionClick("Compare Tang and Song dynasty art styles")}
              >
                Art style comparison
              </button>
              <button
                className="px-4 py-2 bg-white border border-neutral-300 hover:border-neutral-400 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                onClick={() => handleQuestionClick("What is the Library Cave discovery?")}
              >
                Library Cave discovery
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
