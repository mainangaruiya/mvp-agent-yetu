import {
  LayoutGrid,
  CircleUserRound,
  BookOpen,
  Users,
  Route,
  Calendar,
  Sparkles,
  ClipboardList,
  Settings,
  LogOut,
} from 'lucide-react';
import type { NavItem, SidebarProps } from '../../types/dashboard.types';

/**
 * Left navigation — ported 1:1 from the original markup. Same 240px width,
 * same order, same active state on "Teaching Assistant" (blue pill + right
 * indicator bar). No visual changes.
 */
export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard Overview', href: '#dashboard', icon: LayoutGrid },
  { id: 'profile', label: 'My Profile', href: '#profile', icon: CircleUserRound },
  { id: 'classes', label: 'My Classes', href: '#classes', icon: BookOpen },
  { id: 'students', label: 'My Students', href: '#students', icon: Users },
  { id: 'curriculum', label: 'Curriculum Hub', href: '#curriculum', icon: Route },
  { id: 'calendar', label: 'Calendar & Events', href: '#calendar', icon: Calendar },
  { id: 'assistant', label: 'Teaching Assistant', href: '#assistant', icon: Sparkles, active: true },
  { id: 'reports', label: 'Reports & Attendance', href: '#reports', icon: ClipboardList },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { id: 'settings', label: 'Settings', href: '#settings', icon: Settings },
  { id: 'logout', label: 'Log Out', href: '#logout', icon: LogOut, danger: true },
];

function NavLink({ item }: { item: NavItem }) {
  const Icon = item.icon;

  if (item.active) {
    return (
      <a
        className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-50/90 text-brand-blue font-semibold transition-colors relative"
        href={item.href}
      >
        <div className="flex items-center gap-3">
          <Icon className="w-[19px] h-[19px] text-brand-blue" strokeWidth={2} />
          <span>{item.label}</span>
        </div>
        {/* Active blue right indicator bar */}
        <span className="w-1 h-5 bg-brand-blue rounded-full" />
      </a>
    );
  }

  return (
    <a
      className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 transition-colors ${
        item.danger ? 'hover:bg-red-50 hover:text-red-600' : 'hover:bg-slate-100'
      }`}
      href={item.href}
    >
      <Icon
        className={`w-[19px] h-[19px] text-slate-500 ${
          item.danger ? 'group-hover:text-red-600' : ''
        }`}
        strokeWidth={2}
      />
      <span>{item.label}</span>
    </a>
  );
}

export function Sidebar({
  logoSrc,
  logoAlt = 'CodeYetu - #KidsThatCode',
  items = NAV_ITEMS,
  footerItems = FOOTER_NAV_ITEMS,
}: SidebarProps) {
  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 z-20 select-none">
      {/* Top brand & main navigation */}
      <div className="flex flex-col">
        {/* CodeYetu logo area */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center">
          <img alt={logoAlt} className="h-10 w-auto object-contain" src={logoSrc} />
        </div>

        {/* Main navigation menu */}
        <nav className="p-3 space-y-1 text-[13px] font-medium text-slate-600">
          {items.map((item) => (
            <NavLink item={item} key={item.id} />
          ))}
        </nav>
      </div>

      {/* Bottom navigation links */}
      <div className="p-3 border-t border-slate-100 space-y-1 text-[13px] font-medium text-slate-600">
        {footerItems.map((item) => (
          <NavLink item={item} key={item.id} />
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
