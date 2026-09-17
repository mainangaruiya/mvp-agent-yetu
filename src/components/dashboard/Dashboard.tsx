import { useCallback, useRef, useState } from 'react';
import { logo } from '../../assets/logo';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useResizablePanel } from '../../hooks/useResizablePanel';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { QuickActionsPanel } from './QuickActionsPanel';
import { UpcomingSessions } from './UpcomingSessions';
import { RecentChats } from './RecentChats';
import { ResizeHandle } from './ResizeHandle';
import { ChatPanel } from './ChatPanel';
import type { DashboardProps } from '../../types/dashboard.types';

/**
 * Top-level layout container. This is the only file that assembles the full
 * dashboard:
 *
 *   ┌──────────┬───────────────────────────────────┬╌┬────────────┐
 *   │ Sidebar  │ Header                            │ │            │
 *   │ (240px)  ├───────────────────────────────────┤ │ ChatPanel  │
 *   │          │ QuickActionsPanel (primary)       │ │ (resizable)│
 *   │          │ UpcomingSessions / RecentChats    │ │  docked    │
 *   └──────────┴───────────────────────────────────┴╌┴────────────┘
 *                                        drag handle ┘
 *
 * All backend data arrives via `useDashboardData()` — see that hook for the
 * integration stubs. The local UI state is the composer draft (so tool cards
 * and recent-chat rows on the left can prefill the composer on the right) and
 * the chat dock's width, owned by `useResizablePanel`.
 */
export function Dashboard({ data }: DashboardProps) {
  const loaded = useDashboardData();
  const {
    profile,
    sessions,
    recentChats,
    messages,
    isLoading,
    isResponding,
    error,
    sendMessage,
    resetConversation,
  } = data ?? loaded;

  const [draft, setDraft] = useState('');

  const splitRef = useRef<HTMLDivElement>(null);
  const chatPanel = useResizablePanel({
    containerRef: splitRef,
    initialWidth: 380,
    minWidth: 320,
    maxWidth: 820,
    minContentWidth: 460,
    storageKey: 'agentyetu:chat-width',
    label: 'Resize assistant panel',
  });

  /** Tool card / recent chat click → prefill the assistant composer. */
  const handlePromptSelect = useCallback((prompt: string) => {
    setDraft(prompt);
    document.getElementById('assistantInput')?.focus();
  }, []);

  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text);
      setDraft('');
    },
    [sendMessage],
  );

  const handleRefresh = useCallback(() => {
    resetConversation();
    setDraft('');
  }, [resetConversation]);

  return (
    <div className="h-screen overflow-hidden flex bg-slate-50 text-slate-800">
      {/* 1. Left navigation */}
      <Sidebar logoSrc={logo} />

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* 2. Top header */}
        <Header profile={profile} />

        {/* 3. Expanded main content + 4. docked assistant chat */}
        <div className="flex-1 flex overflow-hidden min-w-0" ref={splitRef}>
          <main className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50 space-y-7 min-w-0">
            {error && (
              <div
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
              >
                {error}
              </div>
            )}

            <QuickActionsPanel onToolSelect={handlePromptSelect} />

            {/* Sessions take the wide share of the freed-up main column;
                recent chats sit alongside them on large screens. */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-4">
              <div className="xl:col-span-2">
                <UpcomingSessions
                  columns={2}
                  isLoading={isLoading}
                  onPrepareSession={handlePromptSelect}
                  sessions={sessions}
                />
              </div>
              <div className="xl:col-span-1">
                <RecentChats
                  chats={recentChats}
                  isLoading={isLoading}
                  onChatSelect={handlePromptSelect}
                />
              </div>
            </div>
          </main>

          <ResizeHandle
            bindings={chatPanel.handleProps}
            isResizing={chatPanel.isResizing}
          />

          <ChatPanel
            draft={draft}
            isLoading={isLoading}
            isResponding={isResponding}
            messages={messages}
            onDraftChange={setDraft}
            onRefresh={handleRefresh}
            onSend={handleSend}
            width={chatPanel.width}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
