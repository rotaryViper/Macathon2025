import { getConversationById, getMessagesByConversationId, currentUser } from "@/lib/data";
import { ChatLayout } from "@/components/chat/chat-layout";
import { conversations } from "@/lib/data";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: {
    conversationId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const conversation = getConversationById(params.conversationId);
  
  if (!conversation) {
    notFound();
  }
  
  const messages = getMessagesByConversationId(params.conversationId);
  
  return (
    <div className="container h-[calc(100vh-2rem)] py-4 max-w-6xl">
      <ChatLayout 
        conversations={conversations} 
        currentUser={currentUser}
        initialConversationId={params.conversationId}
        initialMessages={messages}
      />
    </div>
  );
}