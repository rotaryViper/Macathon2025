"use client";

import { useState, useEffect } from "react";
import { Conversation, Message, User } from "@/lib/types";
import { ConversationList } from "./conversation-list";
import { ConversationHeader } from "./conversation-header";
import { MessageList } from "./message-list";
import { MessageInput } from "./message-input";
import { cn } from "@/lib/utils";

interface ChatLayoutProps {
  conversations: Conversation[];
  currentUser: User;
  initialConversationId?: string;
  initialMessages?: Message[];
}

export function ChatLayout({ 
  conversations, 
  currentUser, 
  initialConversationId,
  initialMessages = []
}: ChatLayoutProps) {
  const [activeConversationId, setActiveConversationId] = useState<string | undefined>(initialConversationId);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Find the active conversation
  const activeConversation = conversations.find(c => c.id === activeConversationId);
  
  // Handle sending a new message
  const handleSendMessage = (text: string) => {
    if (!activeConversationId) return;
    
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Simulate message being delivered after a short delay
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' } 
            : msg
        )
      );
      
      // Simulate a reply after a longer delay
      if (Math.random() > 0.5) {
        setTimeout(() => {
          // Simulate typing indicator
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            
            // Get other participant
            const otherParticipant = activeConversation?.participants.find(
              p => p.id !== currentUser.id
            );
            
            if (otherParticipant) {
              const replyMessage: Message = {
                id: `reply-${Date.now()}`,
                senderId: otherParticipant.id,
                text: getRandomReply(),
                timestamp: new Date().toISOString(),
                status: 'delivered'
              };
              
              setMessages(prevMessages => [...prevMessages, replyMessage]);
              
              // Mark the original message as read
              setMessages(prevMessages => 
                prevMessages.map(msg => 
                  msg.id === newMessage.id 
                    ? { ...msg, status: 'read' } 
                    : msg
                )
              );
            }
          }, 2000 + Math.random() * 2000);
        }, 1000 + Math.random() * 3000);
      }
    }, 1000);
  };
  
  // Get a random reply message
  const getRandomReply = (): string => {
    const replies = [
      "Got it, thanks!",
      "I'll check and get back to you.",
      "That sounds good to me.",
      "Let me think about it.",
      "Can we discuss this further?",
      "Thanks for letting me know.",
      "I appreciate the update.",
      "Interesting. Tell me more.",
      "Sure, that works for me.",
      "I'll be available later today.",
    ];
    
    return replies[Math.floor(Math.random() * replies.length)];
  };
  
  // Handle sending an attachment
  const handleSendAttachment = (file: File) => {
    if (!activeConversationId) return;
    
    // Determine if it's an image based on file type
    const isImage = file.type.startsWith('image/');
    
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      senderId: currentUser.id,
      text: isImage ? "Sent an image" : `Sent a file: ${file.name}`,
      timestamp: new Date().toISOString(),
      status: 'sent',
      attachments: [
        {
          id: `att-${Date.now()}`,
          type: isImage ? 'image' : 'file',
          url: isImage 
            ? 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600'
            : '#',
          name: file.name,
          size: file.size
        }
      ]
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Simulate status updates for the attachment message
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' } 
            : msg
        )
      );
    }, 1500);
  };

  // Effect to handle URL changes
  useEffect(() => {
    if (initialConversationId) {
      setActiveConversationId(initialConversationId);
    }
  }, [initialConversationId]);

  // Effect to update messages when conversation changes
  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  return (
    <div className="flex h-full border rounded-md overflow-hidden">
      {/* Conversation list - hidden on mobile */}
      <div className={cn(
        "w-full md:w-80 border-r bg-card",
        activeConversationId ? "hidden md:block" : "block"
      )}>
        <ConversationList 
          conversations={conversations} 
          currentUser={currentUser}
          activeConversationId={activeConversationId}
        />
      </div>
      
      {/* Chat area */}
      <div className={cn(
        "flex-1 flex flex-col",
        !activeConversationId ? "hidden md:flex" : "flex"
      )}>
        {activeConversation ? (
          <>
            <ConversationHeader 
              conversation={activeConversation} 
              currentUser={currentUser} 
            />
            <MessageList 
              messages={messages} 
              currentUser={currentUser} 
              participants={activeConversation.participants}
            />
            {isTyping && (
              <div className="px-4 py-2 text-sm text-muted-foreground">
                Someone is typing...
              </div>
            )}
            <MessageInput 
              onSendMessage={handleSendMessage}
              onSendAttachment={handleSendAttachment}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Select a conversation</h2>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}