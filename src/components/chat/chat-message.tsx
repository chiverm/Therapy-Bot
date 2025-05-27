import type { Message } from '@/app/actions/chat';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Bot } from 'lucide-react';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  return (
    <div
      className={cn(
        'flex items-end gap-2 py-3 px-2 sm:px-0', 
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 self-start shadow-sm">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot size={18} />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-xl px-4 py-3 shadow-md break-words', // Adjusted padding
          isUser
            ? 'bg-accent text-accent-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none border border-border'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p
          className={cn(
            'text-xs mt-1.5 text-right', // Slightly increased margin-top for timestamp
            isUser ? 'text-accent-foreground/80' : 'text-muted-foreground'
          )}
        >
          {format(new Date(message.timestamp), 'HH:mm')}
        </p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 self-start shadow-sm">
          <AvatarFallback className="bg-secondary text-secondary-foreground"> 
            <User size={18} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
