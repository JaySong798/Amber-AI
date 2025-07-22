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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <Logo />
              <div>
                <h1 className="text-xl font-bold text-navy-custom-800">Amber AI</h1>
                <p className="text-xs text-gray-600">Restore the History</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-navy-custom-800 transition-colors">Explore</a>
              <a href="#" className="text-gray-600 hover:text-navy-custom-800 transition-colors">Gallery</a>
              <a href="#" className="text-gray-600 hover:text-navy-custom-800 transition-colors">About</a>
            </nav>
            
            {/* Language Selector and Mobile Menu */}
            <div className="flex items-center space-x-3">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-20 text-sm border-gray-300 focus:ring-turquoise-custom-500 focus:border-turquoise-custom-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">EN</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="ar">عربى</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Mobile Menu Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
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
