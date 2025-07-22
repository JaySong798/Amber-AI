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
            <div className="bg-yellow-orange-500 text-white rounded p-3 max-w-sm shadow-sm">
              <p className="text-sm text-white break-words leading-relaxed">{message.content}</p>
            </div>
            <span className="text-xs text-neutral-500 mt-1 font-medium">You • {formatTime(message.timestamp)}</span>
          </div>
          <div className="w-7 h-7 bg-dark-turquoise-500 rounded flex items-center justify-center flex-shrink-0 shadow-sm">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
        </div>
      </div>
    );
  }

  const structured = message.structured_response;

  return (
    <div className="chat-message">
      <div className="flex items-start space-x-3">
        <div className="w-7 h-7 bg-dark-turquoise-500 rounded flex items-center justify-center flex-shrink-0 shadow-sm">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex-1">
          {structured ? (
            <StructuredResponseComponent 
              response={structured} 
              onQuestionClick={onQuestionClick}
            />
          ) : (
            <div className="bg-white border border-neutral-200 rounded p-3 shadow-sm">
              <p className="text-sm text-neutral-700 break-words leading-relaxed">{message.content}</p>
            </div>
          )}
          <span className="text-xs text-neutral-500 mt-2 block font-medium">
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
    <div className="space-y-4">
      {/* Introduction - Primary Color Block */}
      <div className="response-introduction">
        <div className="response-section-header">
          <Info className="response-section-icon" />
          <h4 className="response-section-title">Overview</h4>
        </div>
        <div className="response-section-content">
          <p className="break-words">{response.introduction}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Artistic Features */}
        <div className="response-artistic-features">
          <div className="response-section-header">
            <Palette className="response-section-icon" />
            <h4 className="response-section-title">Visual Elements</h4>
          </div>
          <div className="response-section-content">
            <div className="space-y-3">
              {response.artistic_features.map((feature, index) => (
                <div key={index} className="bg-neutral-50 rounded p-3">
                  <h5 className="font-medium text-sm mb-1 text-dark-turquoise-700">{feature.title}</h5>
                  <p className="text-xs text-neutral-600 break-words">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cultural Background */}
        <div className="response-cultural-background">
          <div className="response-section-header">
            <MessageSquare className="response-section-icon" />
            <h4 className="response-section-title">Cultural Context</h4>
          </div>
          <div className="response-section-content">
            <p className="break-words text-sm">{response.cultural_background}</p>
          </div>
        </div>
      </div>

      {/* Historical Significance - Secondary Color Block */}
      <div className="response-historical-significance">
        <div className="response-section-header">
          <Landmark className="response-section-icon" />
          <h4 className="response-section-title">Historical Timeline</h4>
        </div>
        <div className="response-section-content">
          <p className="break-words">{response.historical_significance}</p>
        </div>
      </div>

      {/* Follow-up Questions */}
      {response.follow_up_questions.length > 0 && (
        <div className="response-follow-up-questions">
          <div className="response-section-header">
            <MessageCircle className="response-section-icon" />
            <h4 className="response-section-title">Continue Exploring</h4>
          </div>
          <div className="response-section-content">
            <div className="grid gap-2 sm:grid-cols-2">
              {response.follow_up_questions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onQuestionClick(item.question)}
                  className="text-left p-3 bg-white border border-neutral-200 rounded hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-150 text-sm"
                >
                  <div className="font-medium text-neutral-800 mb-1">{item.question}</div>
                  <div className="text-xs text-neutral-500">{item.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
