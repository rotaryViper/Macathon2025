"use client";

import { useState } from "react";
import { Conversation, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Search, MessageSquarePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ConversationListProps {
  conversations: Conversation[];
  currentUser: User;
  activeConversationId?: string;
}

export function ConversationList({ 
  conversations, 
  currentUser, 
  activeConversationId 
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    const participants = conversation.participants.filter(p => p.id !== currentUser.id);
    
    if (conversation.isGroup && conversation.groupName) {
      return conversation.groupName.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // For direct messages, search by participant name
    return participants.some(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Helper function to get conversation display name
  const getConversationName = (conversation: Conversation): string => {
    if (conversation.isGroup && conversation.groupName) {
      return conversation.groupName;
    }
    
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.name || "Unknown";
  };

  // Helper function to get conversation avatar
  const getConversationAvatar = (conversation: Conversation): string => {
    if (conversation.isGroup) {
      // For simplicity, just use the first participant's avatar for group chats
      return conversation.participants[0].avatar;
    }
    
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.avatar || "";
  };

  // Helper function to get last message preview
  const getLastMessagePreview = (conversation: Conversation): string => {
    if (!conversation.lastMessage) return "No messages yet";
    
    if (conversation.lastMessage.attachments && conversation.lastMessage.attachments.length > 0) {
      const attachment = conversation.lastMessage.attachments[0];
      return attachment.type === 'image' ? '📷 Image' : `📎 ${attachment.name}`;
    }
    
    return conversation.lastMessage.text.length > 30
      ? `${conversation.lastMessage.text.substring(0, 27)}...`
      : conversation.lastMessage.text;
  };

  // Helper function to determine if the conversation has an online participant
  const hasOnlineParticipant = (conversation: Conversation): boolean => {
    if (conversation.isGroup) return false;
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.status === "online";
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              fill
              className="object-cover"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold">{currentUser.name}</h2>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
          <Button size="icon" variant="ghost" className="rounded-full">
            <MessageSquarePlus size={20} />
            <span className="sr-only">New conversation</span>
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations"
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No conversations found
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filteredConversations.map((conversation) => (
              <li key={conversation.id}>
                <Link 
                  href={`/chat/${conversation.id}`}
                  className={cn(
                    "flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors",
                    activeConversationId === conversation.id && "bg-muted"
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={getConversationAvatar(conversation)}
                        alt={getConversationName(conversation)}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {hasOnlineParticipant(conversation) && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium truncate">{getConversationName(conversation)}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground truncate">
                        {getLastMessagePreview(conversation)}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge variant="default" className="ml-2 bg-primary">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}