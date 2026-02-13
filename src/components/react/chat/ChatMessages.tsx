import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { ChatAvatar } from './ChatAvatar';
import type { ChatMessage } from '@/lib/chat/types';

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center px-6">
        <p className="text-center text-sm text-muted">
          No messages yet. Say hello to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-2.5',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar — only for assistant messages */}
      {!isUser && <ChatAvatar size="sm" />}

      <div
        className={cn(
          'max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-accent/15 text-foreground'
            : 'bg-surface-elevated text-foreground'
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
