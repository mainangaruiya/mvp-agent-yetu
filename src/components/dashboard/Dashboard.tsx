import { useCallback, useState } from 'react';
import { logo } from '../../assets/logo';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { QuickActionsPanel } from './QuickActionsPanel';
import { UpcomingSessions } from './UpcomingSessions';
import { RecentChats } from './RecentChats';
import { ChatPanel, SEED_MESSAGES } from './ChatPanel';
import type {
  ChatMessage,
  DashboardProps,
  InstructorProfile,
} from '../../types/dashboard.types';

const DEFAULT_PROFILE: InstructorProfile = {
  name: 'Edwin Owino',
  role: 'Senior Instructor',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCxgVjafMe0Yk42HJ-4MP3cHe5O9YRfQxhnf1F6EmiRBg3fUoWaMOk06BFNB1JPiB1a0OPYQP1m7IV1YPDAu_JDft_8nvmGD1dpk5BiIvn-LHiYqrUICcqEw3lN-4OaCBWddskzW_Y7Ys7zh4V7f5v_MaDMJhWSBZVgnw4DlIxKGGnOO7OraZaiYbJQB_ITd4AhBExxVlm-TJvckKA_8UQmT4Zq7cItSIrmt1rxGjlQSXqeXtVFb8cs',
};

const now = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/**
 * Top-level layout container. This is the only file that assembles the full
 * dashboard:
 *
 *   ┌──────────┬────────────────────────────────────────┬────────────┐
 *   │ Sidebar  │ Header                                 │            │
 *   │ (240px)  ├────────────────────────────────────────┤ ChatPanel  │
 *   │          │ QuickActionsPanel  (primary content)   │ (340-380px)│
 *   │          │ UpcomingSessions / RecentChats         │  docked    │
 *   └──────────┴────────────────────────────────────────┴────────────┘
 *
 * Chat state lives here so tool cards and recent-chat rows on the left can
 * push prompts into the docked composer on the right.
 */
export function Dashboard({
  profile = DEFAULT_PROFILE,
  initialMessages = SEED_MESSAGES,
}: DashboardProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState('');

  /** Tool card / recent chat click → prefill the assistant composer. */
  const handlePromptSelect = useCallback((prompt: string) => {
    setDraft(prompt);
    document.getElementById('assistantInput')?.focus();
  }, []);

  const handleSend = useCallback((text: string) => {
    const timestamp = now();
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        timestamp,
        blocks: [{ kind: 'text', text }],
      },
    ]);
    setDraft('');

    // Simulated assistant reply, matching the original prototype behaviour.
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          timestamp: 'Just now',
          blocks: [
            {
              kind: 'text',
              text: 'Great question! Here is a focused resource tailored for',
              highlight: `"${text}"`,
              suffix: ':',
            },
            {
              kind: 'notice',
              text: '✓ Ready! Instant lesson blueprint & rubrics generated. You can download or export this anytime to your classroom board.',
            },
          ],
        },
      ]);
    }, 600);
  }, []);

  const handleRefresh = useCallback(() => {
    setMessages(initialMessages);
    setDraft('');
  }, [initialMessages]);

  return (
    <div className="h-screen overflow-hidden flex bg-slate-50 text-slate-800">
      {/* 1. Left navigation (unchanged) */}
      <Sidebar logoSrc={logo} />

      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* 2. Top header (unchanged) */}
        <Header profile={profile} />

        {/* 3. Expanded main content + 4. docked assistant chat */}
        <div className="flex-1 flex overflow-hidden min-w-0">
          <main className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-slate-50 space-y-7 min-w-0">
            <QuickActionsPanel onToolSelect={handlePromptSelect} />

            {/* Sessions take the wide share of the freed-up main column;
                recent chats sit alongside them on large screens. */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-4">
              <div className="xl:col-span-2">
                <UpcomingSessions columns={2} />
              </div>
              <div className="xl:col-span-1">
                <RecentChats onChatSelect={handlePromptSelect} />
              </div>
            </div>
          </main>

          <ChatPanel
            draft={draft}
            messages={messages}
            onDraftChange={setDraft}
            onRefresh={handleRefresh}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
