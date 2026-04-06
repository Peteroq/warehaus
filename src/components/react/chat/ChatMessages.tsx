'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { ChatMessage } from '@/lib/chat/types';

const SENDER_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  dreamer: { label: 'Dreamer', color: 'text-dream', bg: 'bg-dream-surface' },
  designer: { label: 'Designer', color: 'text-design', bg: 'bg-design-surface' },
  developer: { label: 'Developer', color: 'text-develop', bg: 'bg-develop-surface' },
};

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
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pt-14 md:pt-8 pb-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  const sender = message.sender ? SENDER_CONFIG[message.sender] : null;

  return (
    <div
      className={cn(
        'flex items-start gap-2.5',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Sender avatar dot — only for persona messages */}
      {!isUser && sender && (
        <div className={cn('mt-1 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold', sender.bg, sender.color)}>
          {sender.label[0]}
        </div>
      )}

      <div className={cn('max-w-[85%]', !isUser && sender && 'flex flex-col gap-1')}>
        {/* Sender label */}
        {!isUser && sender && (
          <span className={cn('text-[10px] font-bold uppercase tracking-wider', sender.color)}>
            {sender.label}
          </span>
        )}

        <div
          className={cn(
            'rounded-xl px-3.5 py-2.5 text-sm leading-relaxed',
            isUser
              ? 'bg-white/10 text-foreground'
              : 'bg-white/5 text-foreground'
          )}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
