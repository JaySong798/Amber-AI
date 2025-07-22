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
            <div className="bg-turquoise-custom-500 text-white rounded-lg p-4 max-w-md">
              <p className="text-sm break-words leading-relaxed">{message.content}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">You • {formatTime(message.timestamp)}</span>
          </div>
          <div className="w-8 h-8 bg-turquoise-custom-500 rounded-full flex items-center justify-center flex-shrink-0">
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
        <div className="w-8 h-8 bg-gradient-to-br from-amber-custom-400 to-turquoise-custom-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          {structured ? (
            <StructuredResponseComponent 
              response={structured} 
              onQuestionClick={onQuestionClick}
            />
          ) : (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 break-words leading-relaxed">{message.content}</p>
            </div>
          )}
          <span className="text-xs text-gray-500 mt-2 block">
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
      {/* Introduction */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Info className="w-4 h-4 text-amber-custom-500 mr-2" />
          <h4 className="font-semibold text-navy-custom-800">Introduction</h4>
        </div>
        <p className="text-sm text-gray-700 break-words leading-relaxed">{response.introduction}</p>
      </div>

      {/* Artistic Features */}
      <div className="bg-amber-custom-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Palette className="w-4 h-4 text-turquoise-custom-600 mr-2" />
          <h4 className="font-semibold text-navy-custom-800">Artistic Features</h4>
        </div>
        <div className="space-y-3 text-sm text-gray-700">
          {response.artistic_features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="font-medium text-amber-custom-600 min-w-0">{feature.title}:</span>
              <span className="break-words leading-relaxed">{feature.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Significance */}
      <div className="bg-turquoise-custom-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <Landmark className="w-4 h-4 text-amber-custom-600 mr-2" />
          <h4 className="font-semibold text-navy-custom-800">Historical Significance</h4>
        </div>
        <p className="text-sm text-gray-700 break-words leading-relaxed">{response.historical_significance}</p>
      </div>

      {/* Cultural Background */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <MessageSquare className="w-4 h-4 text-turquoise-custom-600 mr-2" />
          <h4 className="font-semibold text-navy-custom-800">Cultural & Religious Background</h4>
        </div>
        <p className="text-sm text-gray-700 break-words leading-relaxed">{response.cultural_background}</p>
      </div>

      {/* Follow-up Questions */}
      {response.follow_up_questions.length > 0 && (
        <div className="bg-gradient-to-r from-amber-custom-50 to-turquoise-custom-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <MessageSquare className="w-4 h-4 text-navy-custom-700 mr-2" />
            <h4 className="font-semibold text-navy-custom-800">Explore Further</h4>
          </div>
          <div className="space-y-2">
            {response.follow_up_questions.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="block w-full text-left p-2 bg-white rounded-md hover:bg-gray-50 transition-colors suggestion-card h-auto"
                onClick={() => onQuestionClick(item.question)}
              >
                <span className="text-sm font-medium text-navy-custom-800 block">{item.question}</span>
                <span className="text-xs text-gray-500 mt-1 block">{item.description}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
