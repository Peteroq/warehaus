'use client';

import { useEffect, useState, useRef } from 'react';
import {
  UserIcon,
  ChevronLeft,
  ChevronRight,
  MessageSquareIcon,
  SendIcon,
} from 'lucide-react';
import { useLayout } from '@/components/providers/LayoutProvider';
import { useChatApi } from '@/components/react/chat/useChatApi';
import { ChatMessages } from '@/components/react/chat/ChatMessages';

const SECTION_CONTENT = [
  {
    key: 'hero',
    heading: 'Dream your next digital product with us.',
    description:
      "We're here to help you plan and setup your strategy for your new venture in the digital space.",
    tag: '\u3053\u3093\u306B\u3061\u306F\u4E16\u754C',
    code: '0394',
  },
  {
    key: 'work',
    heading: 'Crafting digital experiences that matter.',
    description:
      'From mobile apps to web platforms, we build products that connect with your audience and drive real results.',
    tag: '\u3082\u306E\u3065\u304F\u308A',
    code: '0512',
  },
  {
    key: 'cta',
    heading: "Let's start building together.",
    description:
      'Join the collective and bring your vision to life. Your next great product starts with a conversation.',
    tag: '\u59CB\u3081\u307E\u3057\u3087\u3046',
    code: '0721',
  },
];

export function RightSidebar() {
  const { rightCollapsed, toggleRight, isOnLight, activeSection, scrollProgress } = useLayout();
  const { messages, isLoading, sendMessage } = useChatApi();
  const [chatInput, setChatInput] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (contentRef.current && containerRef.current) {
        const cHeight = containerRef.current.clientHeight;
        setContainerHeight(cHeight);
        const contentHeight = contentRef.current.scrollHeight;
        setMaxScroll(Math.max(0, contentHeight - cHeight));
      }
    };
    updateMeasurements();
    const ro = new ResizeObserver(updateMeasurements);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [rightCollapsed]);

  const translateY = -(scrollProgress * maxScroll);

  const handleSend = () => {
    const trimmed = chatInput.trim();
    if (!trimmed || isLoading) return;
    sendMessage(trimmed);
    setChatInput('');
  };

  return (
    <aside
      className={`flex flex-col h-full w-full backdrop-blur-2xl rounded-3xl relative overflow-hidden transition-all duration-500 ease-in-out ${
        isOnLight
          ? 'bg-black/5 border border-black/10 text-gray-900 shadow-[0_0_40px_rgba(0,0,0,0.08)]'
          : 'bg-white/5 border border-white/15 text-white shadow-[0_0_40px_rgba(0,0,0,0.3)]'
      }`}
    >
      {rightCollapsed ? (
        <div className="flex flex-col h-full p-3 pt-4 items-center gap-6">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={toggleRight}
              className={`w-7 h-7 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 border ${
                isOnLight
                  ? 'bg-white/60 hover:bg-white/80 border-black/10'
                  : 'bg-black/20 hover:bg-black/30 border-white/10'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span
              className={`transition-all duration-500 ${
                isOnLight ? 'text-gray-500 hover:text-gray-900' : 'text-gray-200 hover:text-white'
              }`}
            >
              <UserIcon className="w-5 h-5" />
            </span>
          </div>
          <div className="flex-1" />
          <div className="flex flex-col items-center gap-4 mb-2">
            <div
              title="Start a conversation"
              className={`transition-colors duration-500 ${
                isOnLight ? 'text-gray-500' : 'text-gray-200'
              }`}
            >
              <MessageSquareIcon className="w-5 h-5" />
            </div>
            <div
              className={`text-[10px] font-mono transition-colors duration-500 ${
                isOnLight ? 'text-gray-400' : 'text-gray-300'
              }`}
            >
              {SECTION_CONTENT.find((s) => s.key === activeSection)?.code || '0394'}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full p-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={toggleRight}
              className={`w-7 h-7 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-500 border ${
                isOnLight
                  ? 'bg-white/60 hover:bg-white/80 border-black/10'
                  : 'bg-black/20 hover:bg-black/30 border-white/10'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span
              className={`text-xs font-bold tracking-wider transition-all duration-500 uppercase ${
                isOnLight ? 'text-gray-700' : 'text-white'
              }`}
            >
              Sign In
            </span>
          </div>

          {/* Scroll-synced content */}
          <div ref={containerRef} className="flex-1 overflow-hidden relative">
            <div
              ref={contentRef}
              className="will-change-transform"
              style={{ transform: `translateY(${translateY}px)` }}
            >
              {SECTION_CONTENT.map((data) => (
                <div
                  key={data.key}
                  className="flex flex-col py-6"
                  style={{
                    height: containerHeight > 0 ? `${containerHeight}px` : 'auto',
                  }}
                >
                  <h2
                    className={`text-3xl font-bold leading-tight mb-4 transition-colors duration-500 ${
                      isOnLight ? 'text-gray-900' : 'text-white'
                    }`}
                  >
                    {data.heading}
                  </h2>
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-500 ${
                      isOnLight ? 'text-gray-500' : 'text-gray-200'
                    }`}
                  >
                    {data.description}
                  </p>
                  <div className="flex justify-between items-end mt-auto">
                    <div
                      className={`text-[10px] transition-colors duration-500 ${
                        isOnLight ? 'text-gray-400' : 'text-gray-300'
                      }`}
                    >
                      {data.tag}
                    </div>
                    <div
                      className={`text-xs font-mono transition-colors duration-500 ${
                        isOnLight ? 'text-gray-400' : 'text-gray-300'
                      }`}
                    >
                      {data.code}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat section */}
          <div className="mt-6">
            <div className="rounded-2xl p-[2px] relative shadow-lg transition-all duration-500 bg-black text-white">
              <div className="flex items-center gap-2 mb-0 px-3 py-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  Start Here
                </div>
              </div>

              <div className="rounded-xl bg-white p-3 space-y-3">
                {messages.length > 0 ? (
                  <div className="max-h-32 overflow-y-auto">
                    <ChatMessages messages={messages} />
                  </div>
                ) : (
                  <div className="text-xs p-2.5 rounded-lg bg-gray-100 text-gray-900">
                    What can we help you build?
                  </div>
                )}

                <textarea
                  className="w-full text-xs p-2.5 rounded-lg resize-none border-0 focus:ring-1 focus:ring-gray-300 outline-none h-16 bg-white text-black placeholder-gray-400"
                  placeholder="Share your thoughts..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !chatInput.trim()}
                    className="text-xs font-bold py-1.5 px-4 rounded-full flex items-center gap-2 bg-black text-white hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    SEND <SendIcon className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
