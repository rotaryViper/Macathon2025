import { conversations, currentUser } from "@/lib/data";
import { ChatLayout } from "@/components/chat/chat-layout";

export default function ChatHomePage() {
  return (
    <div className="container h-[calc(100vh-2rem)] py-4 max-w-6xl">
      <ChatLayout 
        conversations={conversations} 
        currentUser={currentUser}
      />
    </div>
  );
}