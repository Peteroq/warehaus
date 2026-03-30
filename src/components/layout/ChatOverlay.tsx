'use client';

import { useEffect } from 'react';
import { useLayout } from '@/components/providers/LayoutProvider';
import { X } from 'lucide-react';
import { ChatMessages } from '@/components/react/chat/ChatMessages';
import { ChatInput } from '@/components/react/chat/ChatInput';
import { ChatAvatar } from '@/components/react/chat/ChatAvatar';
import { useChatApi } from '@/components/react/chat/useChatApi';

export function ChatOverlay() {
  const { chatOverlayOpen, toggleChatOverlay } = useLayout();
  const { messages, isLoading, sendMessage, error } = useChatApi();

  // Lock body scroll when open
  useEffect(() => {
    if (chatOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [chatOverlayOpen]);

  // Close on Escape
  useEffect(() => {
    if (!chatOverlayOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') toggleChatOverlay();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [chatOverlayOpen, toggleChatOverlay]);

  return (
    <div
      role="dialog"
      aria-label="Warehaus AI Chat"
      aria-modal="true"
      className={`fixed inset-0 z-[60] flex flex-col transition-all duration-300 ${
        chatOverlayOpen
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

      {/* Chat container */}
      <div className="relative z-10 flex flex-1 flex-col max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <ChatAvatar size="md" />
            <div>
              <h2 className="font-display text-sm font-semibold text-white">
                Warehaus AI
              </h2>
              <p className="text-xs text-white/40">Ask anything about your project</p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleChatOverlay}
            aria-label="Close chat"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.1] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Welcome message when empty */}
        {messages.length === 0 && (
          <div className="px-6 py-8">
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
              Start Here
            </span>
            <p className="mt-3 text-sm leading-relaxed text-white/60 max-w-md">
              Welcome to Warehaus AI. Ask me anything about your project — from
              design ideas to code architecture.
            </p>
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <ChatMessages messages={messages} />
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-5 mb-2 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-xs text-red-400">
            {error}
          </div>
        )}

        {/* Input */}
        <div className="pb-4">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
