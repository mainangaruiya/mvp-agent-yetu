import { Bell, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import type { HeaderProps } from '../../types/dashboard.types';

/**
 * Top header bar — ported 1:1 from the original markup: 64px tall, pill
 * search on the left, active-assistant badge / notification bell / profile
 * block on the right. No visual changes.
 */
export function Header({
  profile,
  searchPlaceholder = 'Search curriculum, strategies, files...',
  statusLabel = 'Active Assistant',
  onSearch,
  onNotificationsClick,
}: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 z-10">
      {/* Search input in rounded pill */}
      <div className="relative w-full max-w-md">
        <Search className="w-[18px] h-[18px] text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          className="w-full pl-10 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-[13px] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
          onChange={(event) => onSearch?.(event.target.value)}
          placeholder={searchPlaceholder}
          type="text"
        />
      </div>

      {/* Right header actions */}
      <div className="flex items-center gap-4">
        {/* Active assistant status badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{statusLabel}</span>
        </div>

        {/* Notification bell */}
        <Button
          aria-label="Notifications"
          className="relative text-slate-500 hover:text-slate-700"
          onClick={onNotificationsClick}
          size="md"
          variant="icon"
        >
          <Bell className="w-5 h-5" />
        </Button>

        {/* Instructor profile details */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <img
            alt={profile.name}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
            src={profile.avatarUrl}
          />
          <div className="text-left leading-tight hidden sm:block">
            <div className="text-xs font-bold text-slate-900">{profile.name}</div>
            <div className="text-[11px] text-slate-500 font-medium">{profile.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
