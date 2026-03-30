'use client';

import { useState, useCallback, type KeyboardEvent, type ChangeEvent } from 'react';
import { cn } from '@/lib/utils/cn';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }, [value, disabled, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <div className="flex items-end gap-2 px-4 py-3">
      <textarea
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
        placeholder="Type a message..."
        className={cn(
          'flex-1 resize-none rounded-xl bg-white/70 backdrop-blur-2xl px-3 py-2 text-sm text-black',
          'placeholder:text-black/40',
          'border border-white/20 focus:border-white/40 focus:outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
      />

      <button
        type="button"
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
          'bg-white/70 backdrop-blur-2xl text-black/60 border border-white/20 transition-colors',
          'hover:bg-white/80 hover:text-black',
          'disabled:cursor-not-allowed disabled:opacity-40'
        )}
      >
        {/* Send arrow icon */}
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M22 2L11 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 2L15 22L11 13L2 9L22 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
