import { Lightbulb, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickQuestion, Topic } from "@/lib/types";

interface SidebarProps {
  onQuestionClick: (question: string) => void;
}

const quickQuestions: QuickQuestion[] = [
  {
    question: "What is Dunhuang calligraphy?",
    description: "Learn about the elegant writing traditions"
  },
  {
    question: "Who are the Flying Apsaras?",
    description: "Discover celestial beings in Buddhist art"
  },
  {
    question: "Tell me about Cave 148 murals",
    description: "Explore specific cave artworks"
  }
];

const topics: Topic[] = [
  { id: "frescoes", name: "Frescoes", question: "Tell me about the fresco techniques used in Dunhuang caves" },
  { id: "buddhist-art", name: "Buddhist Art", question: "Explain the Buddhist symbolism in Dunhuang art" },
  { id: "silk-road", name: "Silk Road", question: "How did the Silk Road influence Dunhuang culture?" },
  { id: "tang-dynasty", name: "Tang Dynasty", question: "What makes Tang Dynasty art in Dunhuang special?" },
  { id: "calligraphy", name: "Calligraphy", question: "Describe the calligraphy styles found in Dunhuang" },
  { id: "religious-art", name: "Religious Art", question: "What religious traditions are represented in Dunhuang?" }
];

export function Sidebar({ onQuestionClick }: SidebarProps) {
  return (
    <aside className="w-full lg:w-80 bg-card/90 backdrop-blur-sm border-r border-sand-200 p-6 lg:sticky lg:top-16 lg:h-screen lg:overflow-y-auto">
      {/* Welcome Section */}
      <div className="mb-8 p-6 bg-sand-100/60 border border-terracotta-100 rounded-xl lotus-pattern section-card">
        <h2 className="text-lg font-semibold text-cave-brown-800 mb-2">Welcome to Dunhuang</h2>
        <p className="text-sm text-cave-brown-600 mb-4 leading-relaxed">
          Explore the rich cultural heritage of Dunhuang through AI-powered conversations about art, history, and spiritual legacy.
        </p>
        <div className="flex items-center space-x-2 text-xs text-turquoise-600 font-medium">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          <span>4th-11th Century Art</span>
        </div>
      </div>
      
      {/* Quick Start Questions */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-cave-brown-800 mb-4 flex items-center">
          <Lightbulb className="w-4 h-4 text-gold-500 mr-2" />
          Quick Start Questions
        </h3>
        <div className="space-y-3">
          {quickQuestions.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full text-left p-3 bg-sand-100/50 hover:bg-sand-200 rounded-lg transition-all duration-200 suggestion-card h-auto justify-start border border-sand-200/50"
              onClick={() => onQuestionClick(item.question)}
            >
              <div>
                <p className="text-sm font-medium text-cave-brown-800">{item.question}</p>
                <p className="text-xs text-cave-brown-600 mt-1">{item.description}</p>
              </div>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Topics Explorer */}
      <div>
        <h3 className="text-sm font-semibold text-cave-brown-800 mb-4 flex items-center">
          <Compass className="w-4 h-4 text-turquoise-500 mr-2" />
          Explore Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <Button
              key={topic.id}
              variant="ghost"
              size="sm"
              className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 h-auto border ${
                index % 3 === 0 
                  ? "bg-terracotta-100 text-terracotta-700 hover:bg-terracotta-200 border-terracotta-200" 
                  : index % 3 === 1
                  ? "bg-turquoise-100 text-turquoise-700 hover:bg-turquoise-200 border-turquoise-200"
                  : "bg-gold-100 text-gold-700 hover:bg-gold-200 border-gold-200"
              }`}
              onClick={() => onQuestionClick(topic.question)}
            >
              {topic.name}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}
