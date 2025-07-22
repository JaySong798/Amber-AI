import { Bot, User, Info, Palette, Landmark, MessageSquare } from "lucide-react";
import { ChatMessage, StructuredResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface MessageProps {
  message: ChatMessage;
  onQuestionClick: (question: string) => void;
}

export function Message({ message, onQuestionClick }: MessageProps) {
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    return timestamp.toLocaleDateString();
  };

  if (message.role === 'user') {
    return (
      <div className="chat-message">
        <div className="flex items-start space-x-3 justify-end">
          <div className="flex-1 flex flex-col items-end">
            <div className="bg-cave-brown-500 text-black rounded-lg p-4 max-w-md shadow-sm border border-cave-brown-300">
              <p className="text-sm break-words leading-relaxed">{message.content}</p>
            </div>
            <span className="text-xs text-deep-bronze-500 mt-1 font-medium">You • {formatTime(message.timestamp)}</span>
          </div>
          <div className="w-8 h-8 bg-turquoise-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    );
  }

  const structured = message.structured_response;

  return (
    <div className="chat-message">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-turquoise-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          {structured ? (
            <StructuredResponseComponent 
              response={structured} 
              onQuestionClick={onQuestionClick}
            />
          ) : (
            <div className="bg-warm-cream-100/80 border border-cave-brown-300 rounded-lg p-4 section-card">
              <p className="text-sm text-deep-bronze-700 break-words leading-relaxed">{message.content}</p>
            </div>
          )}
          <span className="text-xs text-deep-bronze-500 mt-2 block font-medium">
            Amber AI • {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
}

function StructuredResponseComponent({ 
  response, 
  onQuestionClick 
}: { 
  response: StructuredResponse;
  onQuestionClick: (question: string) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Introduction */}
      <div className="response-introduction">
        <div className="response-section-header">
          <Info className="response-section-icon text-imperial-gold-600" />
          <h4 className="response-section-title text-imperial-gold-700">Introduction</h4>
        </div>
        <div className="response-section-content">
          <p className="text-imperial-gold-800 break-words">{response.introduction}</p>
        </div>
      </div>

      {/* Artistic Features */}
      <div className="response-artistic-features">
        <div className="response-section-header">
          <Palette className="response-section-icon text-cave-brown-600" />
          <h4 className="response-section-title text-cave-brown-700">Artistic Features</h4>
        </div>
        <div className="response-section-content">
          <div className="space-y-4 text-cave-brown-800">
            {response.artistic_features.map((feature, index) => (
              <div key={index} className="bg-cave-brown-100/40 rounded-lg p-3 border border-cave-brown-200">
                <h5 className="font-semibold text-cave-brown-700 mb-2">{feature.title}</h5>
                <p className="break-words">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Significance */}
      <div className="response-historical-significance">
        <div className="response-section-header">
          <Landmark className="response-section-icon text-deep-bronze-600" />
          <h4 className="response-section-title text-deep-bronze-700">Historical Significance</h4>
        </div>
        <div className="response-section-content">
          <p className="text-deep-bronze-800 break-words">{response.historical_significance}</p>
        </div>
      </div>

      {/* Cultural Background */}
      <div className="response-cultural-background">
        <div className="response-section-header">
          <MessageSquare className="response-section-icon text-imperial-gold-600" />
          <h4 className="response-section-title text-imperial-gold-700">Cultural & Religious Background</h4>
        </div>
        <div className="response-section-content">
          <p className="text-imperial-gold-800 break-words">{response.cultural_background}</p>
        </div>
      </div>

      {/* Follow-up Questions */}
      {response.follow_up_questions.length > 0 && (
        <div className="response-follow-up-questions">
          <div className="response-section-header">
            <MessageSquare className="response-section-icon text-turquoise-blue-600" />
            <h4 className="response-section-title text-turquoise-blue-700">Explore Further</h4>
          </div>
          <div className="response-section-content">
            <div className="space-y-3">
              {response.follow_up_questions.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="block w-full text-left p-4 bg-turquoise-blue-100/40 border border-turquoise-blue-200 rounded-lg hover:bg-turquoise-blue-100/60 hover:border-turquoise-blue-400 transition-all duration-200 h-auto"
                  onClick={() => onQuestionClick(item.question)}
                >
                  <span className="text-sm font-semibold text-turquoise-blue-800 block">{item.question}</span>
                  <span className="text-xs text-turquoise-blue-700 mt-2 block opacity-80">{item.description}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
