import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/logo";
import { Sidebar } from "@/components/sidebar";
import { ChatInterface } from "@/components/chat-interface";
import { ChatMessage } from "@/lib/types";

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [language, setLanguage] = useState("en");

  const handleQuestionClick = (question: string) => {
    // This will be handled by the ChatInterface component
    // The question will be set in the input field
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <ChatInterface messages={messages} setMessages={setMessages} />
    </div>
  );
}
