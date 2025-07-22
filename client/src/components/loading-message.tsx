import { Bot } from "lucide-react";

export function LoadingMessage() {
  return (
    <div className="chat-message">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-tang-red-500 to-turquoise-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="bg-card border border-primary rounded-lg p-4 section-card">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground font-medium">Exploring Dunhuang archives</span>
              <div className="loading-dots flex space-x-1">
                <span className="w-1 h-1 bg-primary rounded-full"></span>
                <span className="w-1 h-1 bg-primary rounded-full"></span>
                <span className="w-1 h-1 bg-primary rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
