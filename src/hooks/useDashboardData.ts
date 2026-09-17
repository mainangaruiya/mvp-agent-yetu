import { useCallback, useEffect, useState } from 'react';
import type {
  ChatMessage,
  DashboardData,
  InstructorProfile,
  RecentChat,
  UpcomingSession,
} from '../types/dashboard.types';

/* ==================================================================== *
 *  INTEGRATION POINT                                                   *
 *  ------------------------------------------------------------------ *
 *  This is the only file that talks to the backend. Every function      *
 *  below is an unimplemented stub returning empty data, so the UI       *
 *  renders its loading and empty states instead of placeholder content. *
 *                                                                       *
 *  To wire up the real API, replace the bodies marked TODO. No          *
 *  component needs to change — they all read from this contract.        *
 * ==================================================================== */

/** TODO(integration): point at the real API base URL (e.g. import.meta.env.VITE_API_URL). */
export const API_BASE_URL = '';

interface DashboardState {
  profile: InstructorProfile | null;
  sessions: UpcomingSession[];
  recentChats: RecentChat[];
  messages: ChatMessage[];
  isLoading: boolean;
  isResponding: boolean;
  error: string | null;
}

const INITIAL_STATE: DashboardState = {
  profile: null,
  sessions: [],
  recentChats: [],
  messages: [],
  isLoading: true,
  isResponding: false,
  error: null,
};

/** TODO(integration): GET /api/me */
async function fetchProfile(): Promise<InstructorProfile | null> {
  return null;
}

/** TODO(integration): GET /api/sessions/upcoming */
async function fetchUpcomingSessions(): Promise<UpcomingSession[]> {
  return [];
}

/** TODO(integration): GET /api/assistant/conversations/recent */
async function fetchRecentChats(): Promise<RecentChat[]> {
  return [];
}

/** TODO(integration): GET /api/assistant/conversations/current */
async function fetchConversation(): Promise<ChatMessage[]> {
  return [];
}

/**
 * TODO(integration): POST /api/assistant/messages
 *
 * Should resolve with the assistant's reply. Build the reply's `blocks` from
 * the API response using the ChatBlock union in dashboard.types.ts — return
 * `null` to leave the thread unchanged.
 */
async function postAssistantMessage(_text: string): Promise<ChatMessage | null> {
  return null;
}

const newId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const timestamp = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

/**
 * Loads dashboard data and exposes the assistant send action.
 *
 * Until the stubs above are implemented this resolves to empty collections,
 * which is intentional — the components render real empty states rather than
 * sample content.
 */
export function useDashboardData(): DashboardData {
  const [state, setState] = useState<DashboardState>(INITIAL_STATE);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const [profile, sessions, recentChats, messages] = await Promise.all([
          fetchProfile(),
          fetchUpcomingSessions(),
          fetchRecentChats(),
          fetchConversation(),
        ]);

        if (cancelled) return;
        setState({
          profile,
          sessions,
          recentChats,
          messages,
          isLoading: false,
          isResponding: false,
          error: null,
        });
      } catch (cause) {
        if (cancelled) return;
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: cause instanceof Error ? cause.message : 'Failed to load dashboard.',
        }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const sendMessage = useCallback((text: string) => {
    // The user's own message is appended optimistically — this is real
    // behaviour, not sample data.
    const userMessage: ChatMessage = {
      id: newId(),
      role: 'user',
      timestamp: timestamp(),
      blocks: [{ kind: 'text', text }],
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isResponding: true,
      error: null,
    }));

    void (async () => {
      try {
        const reply = await postAssistantMessage(text);
        setState((prev) => ({
          ...prev,
          messages: reply ? [...prev.messages, reply] : prev.messages,
          isResponding: false,
        }));
      } catch (cause) {
        setState((prev) => ({
          ...prev,
          isResponding: false,
          error: cause instanceof Error ? cause.message : 'Failed to reach the assistant.',
        }));
      }
    })();
  }, []);

  const resetConversation = useCallback(() => {
    // TODO(integration): DELETE /api/assistant/conversations/current
    setState((prev) => ({ ...prev, messages: [], isResponding: false, error: null }));
  }, []);

  return { ...state, sendMessage, resetConversation };
}

export default useDashboardData;
