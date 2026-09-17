import type * as React from 'react';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Left navigation                                                     */
/* ------------------------------------------------------------------ */

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  /** Renders the blue active pill + right indicator bar. */
  active?: boolean;
  /** Bottom-dock links use a red destructive hover treatment. */
  danger?: boolean;
}

export interface SidebarProps {
  logoSrc: string;
  logoAlt?: string;
  items?: NavItem[];
  footerItems?: NavItem[];
}

/* ------------------------------------------------------------------ */
/* Top header                                                          */
/* ------------------------------------------------------------------ */

export interface InstructorProfile {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface HeaderProps {
  /** `null` while the profile request is in flight. */
  profile: InstructorProfile | null;
  searchPlaceholder?: string;
  statusLabel?: string;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onNotificationsClick?: () => void;
}

/* ------------------------------------------------------------------ */
/* Instant Classroom Tools (primary content)                           */
/* ------------------------------------------------------------------ */

/** Solid gradient tiles vs. white outlined tiles, as in the original grid. */
export type ToolVariant = 'gradient' | 'outline';

export interface ClassroomTool {
  id: string;
  title: string;
  description: string;
  /** Small uppercase chip in the card's top-right corner. */
  tag: string;
  /** Footer call-to-action label. */
  cta: string;
  icon: LucideIcon;
  variant: ToolVariant;
  /** Prompt pushed into the assistant composer when the card is clicked. */
  prompt: string;
  /** Tailwind classes driving the card's colour treatment. */
  theme: ToolTheme;
}

export interface ToolTheme {
  /** Card surface: gradient stack or white + hover border colour. */
  surface: string;
  /** Icon chip background/border/text. */
  iconChip: string;
  /** Tag chip background/border/text. */
  tagChip: string;
  /** Body copy colour. */
  body: string;
  /** Footer divider colour. */
  divider: string;
  /** Footer label colour. */
  cta: string;
  /** Circular arrow affordance in the footer. */
  arrow: string;
  /** Title colour. */
  title: string;
}

export interface QuickActionsPanelProps {
  tools?: ClassroomTool[];
  onToolSelect: (prompt: string) => void;
  heading?: string;
  subheading?: string;
}

export interface ToolCardProps {
  tool: ClassroomTool;
  onSelect: (prompt: string) => void;
}

/* ------------------------------------------------------------------ */
/* Upcoming sessions                                                   */
/* ------------------------------------------------------------------ */

export type SessionStatus = 'ready' | 'in-prep' | 'scheduled';

export interface UpcomingSession {
  id: string;
  /** Track/module label above the session title. */
  module: string;
  title: string;
  time: string;
  studentCount: number;
  status: SessionStatus;
  /** Optional Tailwind background class for the module dot. */
  accentClass?: string;
}

export interface UpcomingSessionsProps {
  sessions: UpcomingSession[];
  isLoading?: boolean;
  scheduleHref?: string;
  /** Sessions render 3-up in a wide column, 1-up when stacked beside chat. */
  columns?: 1 | 2 | 3;
}

/* ------------------------------------------------------------------ */
/* Recent assist chats                                                 */
/* ------------------------------------------------------------------ */

export interface RecentChat {
  id: string;
  title: string;
  /** Preformatted display date, e.g. "Yesterday" or "12 Mar 2026". */
  date: string;
  exchanges: number;
  prompt: string;
}

export interface RecentChatsProps {
  chats: RecentChat[];
  isLoading?: boolean;
  onChatSelect: (prompt: string) => void;
}

/* ------------------------------------------------------------------ */
/* Assistant chat panel                                                */
/* ------------------------------------------------------------------ */

export type ChatRole = 'user' | 'assistant';

export interface TimelineEntry {
  duration: string;
  title: string;
  detail: string;
}

export interface GameStep {
  text: string;
  /** Optional inline code sample rendered under the step. */
  code?: string;
}

/** Rich content blocks the assistant can render inside a bubble. */
export type ChatBlock =
  | { kind: 'text'; text: string; highlight?: string; suffix?: string }
  | {
      kind: 'lessonPlan';
      title: string;
      objective: string;
      timeline: TimelineEntry[];
    }
  | { kind: 'gameRules'; title: string; steps: GameStep[] }
  | { kind: 'notice'; text: string };

export interface ChatMessage {
  id: string;
  role: ChatRole;
  timestamp: string;
  blocks: ChatBlock[];
}

export interface QuickPrompt {
  id: string;
  emoji: string;
  label: string;
  prefix: string;
}

export interface ChatPanelProps {
  messages: ChatMessage[];
  /** Controlled composer value, driven by tool/recent-chat clicks. */
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: (text: string) => void;
  /** True between sending a message and the assistant reply arriving. */
  isResponding?: boolean;
  isLoading?: boolean;
  quickPrompts?: QuickPrompt[];
  onBookmark?: () => void;
  onRefresh?: () => void;
  assistantName?: string;
  assistantStatus?: string;
}

export interface ChatBubbleProps {
  message: ChatMessage;
  assistantName?: string;
}

/* ------------------------------------------------------------------ */
/* Shared UI primitives                                                */
/* ------------------------------------------------------------------ */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `flat` drops the shadow; `interactive` adds hover/active affordances. */
  variant?: 'default' | 'flat' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'pill';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/* Top-level composition                                               */
/* ------------------------------------------------------------------ */

export interface DashboardProps {
  /** Overrides the data hook. Leave unset to use `useDashboardData()`. */
  data?: DashboardData;
}

/* ------------------------------------------------------------------ */
/* Data layer contract                                                 */
/* ------------------------------------------------------------------ */

/**
 * Everything `Dashboard` needs from the backend. `useDashboardData()` is the
 * single implementation of this contract — wire the real API there.
 */
export interface DashboardData {
  profile: InstructorProfile | null;
  sessions: UpcomingSession[];
  recentChats: RecentChat[];
  messages: ChatMessage[];
  isLoading: boolean;
  isResponding: boolean;
  error: string | null;
  sendMessage: (text: string) => void;
  resetConversation: () => void;
}
