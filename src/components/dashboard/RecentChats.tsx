import { ChevronRight, MessageSquareDashed } from 'lucide-react';
import type { RecentChatsProps } from '../../types/dashboard.types';

function ChatSkeleton() {
  return (
    <div className="px-4 py-3 animate-pulse">
      <div className="h-3.5 w-2/3 rounded bg-slate-200" />
      <div className="h-2.5 w-1/3 rounded bg-slate-100 mt-2" />
    </div>
  );
}

/** "Recent Assist Chats" — data supplied by the caller. */
export function RecentChats({
  chats,
  isLoading = false,
  onChatSelect,
}: RecentChatsProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
        Recent Assist Chats
      </h2>

      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
          {Array.from({ length: 3 }, (_, index) => (
            <ChatSkeleton key={index} />
          ))}
        </div>
      ) : chats.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center">
          <MessageSquareDashed className="w-6 h-6 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">No recent chats</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Conversations with the assistant will be listed here.
          </p>
        </div>
      ) : (
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
      )}
    </section>
  );
}

export default RecentChats;
