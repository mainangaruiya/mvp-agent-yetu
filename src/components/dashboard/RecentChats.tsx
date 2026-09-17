import { ChevronRight } from 'lucide-react';
import type { RecentChat, RecentChatsProps } from '../../types/dashboard.types';

export const RECENT_CHATS: RecentChat[] = [
  {
    id: 'shy-student',
    title: 'Handling shy student block',
    date: 'Yesterday',
    exchanges: 4,
    prompt:
      'How can I better handle a shy student who gets stuck during interactive coding?',
  },
  {
    id: 'html-css-cheatsheet',
    title: 'HTML/CSS Quick Cheatsheet',
    date: 'Oct 29, 2025',
    exchanges: 12,
    prompt: 'Show me the HTML/CSS Quick Cheatsheet for beginners.',
  },
  {
    id: 'simon-says',
    title: 'Interactive Simon Says setup',
    date: 'Oct 24, 2025',
    exchanges: 1,
    prompt: 'Review the Robotic Simon Says interactive warmup rule set.',
  },
];

/** "Recent Assist Chats" — extracted from the original right column. */
export function RecentChats({ chats = RECENT_CHATS, onChatSelect }: RecentChatsProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Recent Assist Chats
      </h2>
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden text-xs">
        {chats.map((chat) => (
          <button
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
            key={chat.id}
            onClick={() => onChatSelect(chat.prompt)}
            type="button"
          >
            <div>
              <p className="font-semibold text-slate-800 text-[13px]">{chat.title}</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {chat.date} • {chat.exchanges}{' '}
                {chat.exchanges === 1 ? 'exchange' : 'exchanges'}
              </p>
            </div>
            <ChevronRight className="w-[18px] h-[18px] text-slate-400 shrink-0" />
          </button>
        ))}
      </div>
    </section>
  );
}

export default RecentChats;
