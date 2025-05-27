'use client';

import { useState, useEffect, useRef } from 'react';
import type { Message } from '@/app/actions/chat';
import { handleUserMessage } from '@/app/actions/chat';
import { ChatMessage } from './chat-message';
import { MessageInput } from './message-input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot } from 'lucide-react';

export function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaViewportRef = useRef<HTMLDivElement>(null);

  // Initial greeting message from AI
  useEffect(() => {
    setMessages([
      {
        id: `ai-greeting-${Date.now()}`,
        text: "Hello! I'm DeepTalk, your AI companion for emotional support. How are you feeling today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    if (scrollAreaViewportRef.current) {
      scrollAreaViewportRef.current.scrollTo({
        top: scrollAreaViewportRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (text.trim() === '') return;
    const userMessage: Message = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage].slice(-10); // Keep last 10 messages for context
      
      const aiResponse = await handleUserMessage({ 
        userMessage: text,
        conversationHistory 
      });
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      const errorResponseMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I encountered an error. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow h-[calc(100vh-var(--header-height))]"> 
      <ScrollArea className="flex-grow p-4" viewportRef={scrollAreaViewportRef}>
        <div className="container mx-auto max-w-3xl space-y-2"> {/* Centered content with max-width, increased space-y */}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 py-3 px-2 sm:px-0 justify-start text-muted-foreground">
               <Bot size={20} className="animate-pulse text-primary" /> {/* Enhanced loading state */}
              <span>AI is thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>
      <MessageInput onSendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
}
