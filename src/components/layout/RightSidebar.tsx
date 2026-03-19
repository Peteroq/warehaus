'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
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
import { HERO_TAB_SECTIONS, getSectionsForPath } from '@/lib/data/sidebarSections';
import { SectionBlock } from '@/components/layout/SectionBlock';
import { ScrollSyncedPanel } from '@/components/layout/ScrollSyncedPanel';
import { SidebarPanel } from '@/components/layout/SidebarPanel';
import { TabCyclePanel } from '@/components/layout/TabCyclePanel';

export function RightSidebar() {
  const pathname = usePathname();
  const { rightCollapsed, toggleRight, isOnLight, activeSection, heroTabIndex } = useLayout();
  const { messages, isLoading, sendMessage } = useChatApi();
  const [chatInput, setChatInput] = useState('');
  const SECTION_CONTENT = getSectionsForPath(pathname);
  const isHomePage = pathname === '/';

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
              {isHomePage && activeSection === 'hero'
                ? HERO_TAB_SECTIONS[heroTabIndex]?.code || '0001'
                : SECTION_CONTENT.find((s) => s.key === activeSection)?.code || '0394'}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full p-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
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

          {/* Section-synced content */}
          <ScrollSyncedPanel>
            {({ containerHeight, mounted }) =>
              SECTION_CONTENT.map((data, i) => {
                const isActive = mounted ? data.key === activeSection : i === 0;
                const isHeroSlot = isHomePage && data.key === 'hero';
                return (
                  <SidebarPanel
                    key={data.key}
                    active={isActive}
                    height={containerHeight}
                    mounted={mounted}
                  >
                    {isHeroSlot ? (
                      <TabCyclePanel activeIndex={heroTabIndex}>
                        {HERO_TAB_SECTIONS.map((tabData) => (
                          <SectionBlock key={tabData.key} data={tabData} isOnLight={isOnLight} />
                        ))}
                      </TabCyclePanel>
                    ) : (
                      <SectionBlock data={data} isOnLight={isOnLight} />
                    )}
                  </SidebarPanel>
                );
              })
            }
          </ScrollSyncedPanel>

          {/* Chat section */}
          <div className="mt-4 relative">
            {/* Avatar — overlapping top-right */}
            <div className="absolute -top-14 right-2 w-24 h-24 z-10 pointer-events-none">
              <img
                src="/images/PAthfinder.png"
                alt="Pathfinder"
                className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              />
            </div>

            <div className="rounded-2xl relative shadow-lg bg-[#0a0a0a] overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 px-4 pt-3 pb-2">
                <div className="text-xs font-bold uppercase tracking-[0.15em] text-gray-300">
                  Start Here
                </div>
              </div>

              {/* White chat area */}
              <div className="rounded-xl bg-white mx-1.5 mb-1.5 p-3 space-y-2">
                {messages.length > 0 ? (
                  <div className="max-h-32 overflow-y-auto">
                    <ChatMessages messages={messages} />
                  </div>
                ) : (
                  <div className="text-[13px] p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-800 leading-relaxed">
                    What can we help you build?
                  </div>
                )}

                <textarea
                  className="w-full text-[13px] p-2.5 rounded-lg resize-none border-0 outline-none h-14 bg-white text-gray-800 placeholder-gray-400"
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
                    className="text-xs font-bold py-2 px-5 rounded-lg flex items-center gap-2 bg-[#0a0a0a] text-white hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
