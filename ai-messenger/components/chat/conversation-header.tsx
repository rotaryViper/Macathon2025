"use client";

import { User, Conversation } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Phone, Video, Info, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ConversationHeaderProps {
  conversation: Conversation;
  currentUser: User;
}

export function ConversationHeader({ conversation, currentUser }: ConversationHeaderProps) {
  // Helper function to get conversation display name
  const getConversationName = (): string => {
    if (conversation.isGroup && conversation.groupName) {
      return conversation.groupName;
    }
    
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.name || "Unknown";
  };

  // Helper function to get conversation avatar
  const getConversationAvatar = (): string => {
    if (conversation.isGroup) {
      // For simplicity, just use the first non-current user participant's avatar for group chats
      const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
      return otherParticipant?.avatar || "";
    }
    
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
    return otherParticipant?.avatar || "";
  };

  // Helper function to get status text
  const getStatusText = (): string => {
    if (conversation.isGroup) {
      return `${conversation.participants.length} members`;
    }
    
    const otherParticipant = conversation.participants.find(p => p.id !== currentUser.id);
    if (!otherParticipant) return "";
    
    if (otherParticipant.status === "online") {
      return "Online";
    } else if (otherParticipant.status === "away") {
      return "Away";
    } else if (otherParticipant.lastSeen) {
      return `Last seen ${new Date(otherParticipant.lastSeen).toLocaleString()}`;
    } else {
      return "Offline";
    }
  };

  return (
    <div className="border-b p-3 flex items-center gap-3">
      <Button asChild size="icon" variant="ghost" className="md:hidden">
        <Link href="/chat">
          <ChevronLeft size={20} />
          <span className="sr-only">Back</span>
        </Link>
      </Button>
      
      <div className="flex items-center flex-1 overflow-hidden">
        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
          <Image
            src={getConversationAvatar()}
            alt={getConversationName()}
            fill
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <h2 className="font-semibold truncate">{getConversationName()}</h2>
          <p className="text-xs text-muted-foreground truncate">{getStatusText()}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        <Button size="icon" variant="ghost" className="hidden md:flex">
          <Phone size={18} />
          <span className="sr-only">Call</span>
        </Button>
        <Button size="icon" variant="ghost" className="hidden md:flex">
          <Video size={18} />
          <span className="sr-only">Video call</span>
        </Button>
        <Button size="icon" variant="ghost">
          <Info size={18} />
          <span className="sr-only">Information</span>
        </Button>
      </div>
    </div>
  );
}