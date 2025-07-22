import { Bot } from "lucide-react";

export function LoadingMessage() {
  return (
    <div className="chat-message">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-custom-400 to-turquoise-custom-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Exploring Dunhuang archives</span>
              <div className="loading-dots flex space-x-1">
                <span className="w-1 h-1 bg-turquoise-custom-500 rounded-full"></span>
                <span className="w-1 h-1 bg-turquoise-custom-500 rounded-full"></span>
                <span className="w-1 h-1 bg-turquoise-custom-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
