"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Paperclip, Send, Image as ImageIcon, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onSendAttachment?: (file: File) => void;
}

export function MessageInput({ onSendMessage, onSendAttachment }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onSendAttachment) {
      onSendAttachment(files[0]);
      // Reset the input
      e.target.value = "";
    }
  };

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  return (
    <div className="border-t dark:border-gray-800 p-4">
      <div className="flex items-end gap-2">
        <div className="flex-1 bg-muted rounded-lg overflow-hidden">
          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            className={cn(
              "min-h-[40px] max-h-[150px] resize-none border-0 focus-visible:ring-0 p-3",
              "placeholder:text-muted-foreground"
            )}
          />
          <div className="flex items-center px-3 py-2">
            <div className="flex gap-2">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full" 
                onClick={handleFileClick}
              >
                <Paperclip size={18} className="text-muted-foreground" />
                <span className="sr-only">Attach file</span>
              </Button>
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full"
                onClick={handleFileClick}
              >
                <ImageIcon size={18} className="text-muted-foreground" />
                <span className="sr-only">Send image</span>
              </Button>
              <Button 
                type="button" 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full"
              >
                <Smile size={18} className="text-muted-foreground" />
                <span className="sr-only">Emoji</span>
              </Button>
            </div>
          </div>
        </div>
        <Button
          type="button"
          size="icon"
          className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex-shrink-0 transition-all duration-200 hover:scale-105"
          onClick={handleSubmit}
          disabled={!message.trim()}
        >
          <Send size={18} />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
      />
    </div>
  );
}