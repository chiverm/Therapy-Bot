'use client';

import { useState, type FormEvent, type KeyboardEvent, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

export function MessageInput({ onSendMessage, isLoading }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (message.trim() === '' || isLoading) return;
    
    const currentMessage = message;
    setMessage(''); // Clear input immediately
    await onSendMessage(currentMessage);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height after sending
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height on message change
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <form
      onSubmit={handleSubmit}
      className="sticky bottom-0 left-0 right-0 bg-background border-t border-border p-4 shadow-sm"
      aria-label="Chat message input form"
    >
      <div className="container mx-auto flex items-start gap-2 max-w-3xl"> {/* Centered with max-width */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="flex-grow resize-none min-h-[40px] max-h-[120px] text-base rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-primary/50 overflow-y-auto"
          rows={1}
          disabled={isLoading}
          aria-label="Message input"
          aria-multiline="true"
        />
        <Button
          type="submit"
          disabled={isLoading || message.trim() === ''}
          className="h-auto aspect-square p-2.5 rounded-lg shadow-sm bg-primary hover:bg-primary/90 text-primary-foreground" // Explicit primary styling
          aria-label={isLoading ? "Sending message" : "Send message"}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </div>
    </form>
  );
}
