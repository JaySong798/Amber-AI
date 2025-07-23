import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { ChatInterface } from "@/components/chat-interface";
import { ChatMessage } from "@/lib/types";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navigation />
      <div className="flex-1 flex flex-col">
        <ChatInterface messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}
