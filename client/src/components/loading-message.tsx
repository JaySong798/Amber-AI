import { Bot } from "lucide-react";

export function LoadingMessage() {
  return (
    <div className="chat-message">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-terracotta-500 to-turquoise-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="bg-sand-100/80 border border-sand-200 rounded-lg p-4 section-card">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-cave-brown-700 font-medium">Exploring Dunhuang archives</span>
              <div className="loading-dots flex space-x-1">
                <span className="w-1 h-1 bg-turquoise-500 rounded-full"></span>
                <span className="w-1 h-1 bg-turquoise-500 rounded-full"></span>
                <span className="w-1 h-1 bg-turquoise-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
