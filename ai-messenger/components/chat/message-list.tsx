"use client";

import { useState, useRef, useEffect } from "react";
import { Message, User } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check, CheckCheck, File } from "lucide-react";

interface MessageGroupProps {
  messages: Message[];
  currentUser: User;
  sender: User;
  isLastGroup: boolean;
}

const MessageGroup = ({ messages, currentUser, sender, isLastGroup }: MessageGroupProps) => {
  const isCurrentUser = sender.id === currentUser.id;
  const lastMessage = messages[messages.length - 1];

  return (
    <div className={cn("flex gap-2 mb-4", isCurrentUser ? "justify-end" : "justify-start")}>
      {!isCurrentUser && (
        <div className="flex-shrink-0 mt-1">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={sender.avatar}
              alt={sender.name}
              fill
              className="object-cover"
            />
            <span className={cn(
              "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white",
              sender.status === "online" ? "bg-green-500" :
              sender.status === "away" ? "bg-yellow-500" : "bg-gray-400"
            )} />
          </div>
        </div>
      )}
      <div className={cn("flex flex-col max-w-[75%]", isCurrentUser ? "items-end" : "items-start")}>
        {!isCurrentUser && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {sender.name}
          </span>
        )}
        <div className="flex flex-col gap-1">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col">
              <div className={cn(
                "px-4 py-2 rounded-2xl break-words",
                isCurrentUser 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-muted rounded-tl-sm"
              )}>
                <div className="whitespace-pre-wrap">{message.text}</div>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map(attachment => (
                      <div key={attachment.id}>
                        {attachment.type === 'image' ? (
                          <div className="relative h-40 w-full rounded-md overflow-hidden">
                            <Image
                              src={attachment.url}
                              alt={attachment.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 p-2 rounded-md bg-background/50">
                            <File size={20} />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{attachment.name}</p>
                              {attachment.size && (
                                <p className="text-xs text-muted-foreground">
                                  {(attachment.size / 1024).toFixed(0)} KB
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {message.id === lastMessage.id && (
                <div className="flex items-center mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                  </span>
                  {isCurrentUser && (
                    <span className="ml-1 text-xs text-muted-foreground">
                      {message.status === 'sent' && <Check size={12} />}
                      {message.status === 'delivered' && <CheckCheck size={12} />}
                      {message.status === 'read' && <CheckCheck size={12} className="text-blue-500" />}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface MessageListProps {
  messages: Message[];
  currentUser: User;
  participants: User[];
}

export function MessageList({ messages, currentUser, participants }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageGroups, setMessageGroups] = useState<{messages: Message[], senderId: string}[]>([]);

  useEffect(() => {
    // Group consecutive messages from the same sender
    const groups: {messages: Message[], senderId: string}[] = [];
    let currentGroup: Message[] = [];
    let currentSenderId: string | null = null;

    messages.forEach((message) => {
      if (message.senderId !== currentSenderId && currentGroup.length > 0) {
        groups.push({ messages: [...currentGroup], senderId: currentSenderId! });
        currentGroup = [message];
        currentSenderId = message.senderId;
      } else {
        currentGroup.push(message);
        currentSenderId = message.senderId;
      }
    });

    if (currentGroup.length > 0 && currentSenderId) {
      groups.push({ messages: currentGroup, senderId: currentSenderId });
    }

    setMessageGroups(groups);
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper function to find a user by ID
  const findUser = (id: string): User => {
    return participants.find(user => user.id === id) || currentUser;
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        {messageGroups.map((group, index) => (
          <MessageGroup
            key={`${group.senderId}-${index}`}
            messages={group.messages}
            currentUser={currentUser}
            sender={findUser(group.senderId)}
            isLastGroup={index === messageGroups.length - 1}
          />
        ))}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}