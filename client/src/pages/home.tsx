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
    <div className="min-h-screen bg-warm-cream-50 tang-imperial-pattern">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm shadow-lg border-b border-primary sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Logo />
              <div>
                <h1 className="text-xl font-bold text-deep-bronze-800">Amber AI</h1>
                <p className="text-xs text-tang-red-600 font-medium">Restore the History</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-deep-bronze-600 hover:text-tang-red-600 transition-colors font-medium">Explore</a>
              <a href="#" className="text-deep-bronze-600 hover:text-tang-red-600 transition-colors font-medium">Gallery</a>
              <a href="#" className="text-deep-bronze-600 hover:text-tang-red-600 transition-colors font-medium">About</a>
            </nav>
            
            {/* Language Selector and Mobile Menu */}
            <div className="flex items-center space-x-3">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-20 text-sm border-primary bg-secondary/50 focus:ring-primary focus:border-primary text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-primary">
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="ar">عربى</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Mobile Menu Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden text-deep-bronze-700 hover:bg-warm-cream-200">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0 bg-warm-cream-50">
                  <div className="h-full overflow-y-auto">
                    <Sidebar onQuestionClick={handleQuestionClick} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar onQuestionClick={handleQuestionClick} />
        </div>
        
        {/* Chat Interface */}
        <ChatInterface messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}
