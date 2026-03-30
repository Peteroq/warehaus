'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useLayout, type ActiveTab } from '@/components/providers/LayoutProvider';
import { ChatMessages } from '@/components/react/chat/ChatMessages';
import { ChatInput } from '@/components/react/chat/ChatInput';
import { useChatApi } from '@/components/react/chat/useChatApi';
import type { ChatMessage } from '@/lib/chat/types';

const GREETING: Record<ActiveTab, ChatMessage> = {
  dream: {
    id: 'greeting-dreamer',
    role: 'assistant',
    content: "What's the vision? Tell me what you're dreaming up and I'll help you shape it into something real.",
    timestamp: new Date(),
    sender: 'dreamer',
  },
  design: {
    id: 'greeting-designer',
    role: 'assistant',
    content: "Ready to make it beautiful. What are we designing — layout, colors, typography, motion? Let's talk.",
    timestamp: new Date(),
    sender: 'designer',
  },
  develop: {
    id: 'greeting-developer',
    role: 'assistant',
    content: "Let's build. What are we working on — components, integrations, performance? I'm ready to ship.",
    timestamp: new Date(),
    sender: 'developer',
  },
};

export function ChatOverlay() {
  const { chatOverlayOpen, toggleChatOverlay, activeTab } = useLayout();
  const { messages, isLoading, sendMessage, error } = useChatApi();

  const allMessages = useMemo(
    () => [GREETING[activeTab], ...messages],
    [activeTab, messages],
  );

  // Lock page scroll when open (but allow chat scroll)
  useEffect(() => {
    if (chatOverlayOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [chatOverlayOpen]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!chatOverlayOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleChatOverlay();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [chatOverlayOpen, toggleChatOverlay]);

  // Close on click outside chat container
  useEffect(() => {
    if (!chatOverlayOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(e.target as Node)) {
        toggleChatOverlay();
      }
    };
    const timer = setTimeout(() => {
      window.addEventListener('click', handleClick);
    }, 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleClick);
    };
  }, [chatOverlayOpen, toggleChatOverlay]);

  return (
    <div
      role="dialog"
      aria-label="Warehaus AI Chat"
      aria-modal="true"
      className={`fixed inset-0 z-40 flex flex-col transition-all duration-300 ${
        chatOverlayOpen
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none'
      }`}
      style={{ bottom: 'calc(1.75rem + 56px)' }}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />

      {/* Chat container */}
      <div ref={chatContainerRef} className="relative z-10 flex flex-1 flex-col max-w-2xl w-full mx-auto">
        {/* Messages — intro thread + user messages */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatMessages messages={allMessages} />
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-5 mb-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-400">
            {error}
          </div>
        )}

        {/* Input pinned to bottom of chat area, above navbar */}
        <div className="pb-3">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
