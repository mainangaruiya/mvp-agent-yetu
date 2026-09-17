import { CalendarClock, CalendarOff, Clock, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import type {
  SessionStatus,
  UpcomingSession,
  UpcomingSessionsProps,
} from '../../types/dashboard.types';

const STATUS_STYLES: Record<SessionStatus, { label: string; className: string }> = {
  ready: {
    label: 'Ready',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  'in-prep': {
    label: 'In Prep',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  scheduled: {
    label: 'Scheduled',
    className: 'bg-blue-50 text-brand-blue border-blue-200',
  },
};

const COLUMN_CLASS: Record<NonNullable<UpcomingSessionsProps['columns']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
};

/** Prep prompt pushed into the assistant composer for a specific session. */
export function buildPrepPrompt(session: UpcomingSession) {
  return (
    `Prepare me for my "${session.title}" session (${session.module}) at ${session.time} ` +
    `with ${session.studentCount} students: recap what the class covered, list the ` +
    `materials I need, and suggest a warmup.`
  );
}

function SessionSkeleton() {
  return (
    <Card className="border-slate-200/80 animate-pulse" padding="sm">
      <div className="flex items-center justify-between mb-2">
        <div className="h-2.5 w-24 rounded bg-slate-200" />
        <div className="h-4 w-14 rounded-md bg-slate-100" />
      </div>
      <div className="h-4 w-4/5 rounded bg-slate-200" />
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between">
        <div className="h-3 w-24 rounded bg-slate-100" />
        <div className="h-3 w-16 rounded bg-slate-100" />
      </div>
      <div className="mt-2.5 h-8 w-full rounded-lg bg-slate-100" />
    </Card>
  );
}

function EmptyState() {
  return (
    <Card
      className="border-dashed border-slate-300 flex flex-col items-center justify-center text-center py-8"
      padding="md"
    >
      <CalendarOff className="w-6 h-6 text-slate-300 mb-2" />
      <p className="text-sm font-semibold text-slate-600">No upcoming sessions</p>
      <p className="text-xs text-slate-400 mt-0.5">
        Scheduled classes will appear here once your calendar is connected.
      </p>
    </Card>
  );
}

/** "Your Upcoming Sessions" — data supplied by the caller. */
export function UpcomingSessions({
  sessions,
  isLoading = false,
  scheduleHref = '#view-calendar',
  columns = 3,
  onPrepareSession,
}: UpcomingSessionsProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <span>Your Upcoming Sessions</span>
          {!isLoading && sessions.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold lowercase">
              {sessions.length} scheduled
            </span>
          )}
        </h2>
        <a
          className="text-xs font-semibold text-brand-blue hover:underline"
          href={scheduleHref}
        >
          View Full Schedule →
        </a>
      </div>

      {isLoading ? (
        <div className={`grid ${COLUMN_CLASS[columns]} gap-3`}>
          {Array.from({ length: columns }, (_, index) => (
            <SessionSkeleton key={index} />
          ))}
        </div>
      ) : sessions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={`grid ${COLUMN_CLASS[columns]} gap-3`}>
          {sessions.map((session) => {
            const status = STATUS_STYLES[session.status];
            return (
              <Card
                className="border-slate-200/80 hover:border-slate-300 transition-colors flex flex-col justify-between"
                key={session.id}
                padding="sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          session.accentClass ?? 'bg-brand-blue'
                        }`}
                      />
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        {session.module}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {session.title}
                  </h4>
                </div>

                <div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-[15px] h-[15px] text-slate-400" />
                      {session.time}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-[15px] h-[15px] text-slate-400" />
                      {session.studentCount} students
                    </span>
                  </div>

                  <button
                    className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-brand-blue hover:bg-blue-100 hover:border-blue-300 active:scale-[0.99] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40"
                    onClick={() => onPrepareSession(buildPrepPrompt(session))}
                    type="button"
                  >
                    <CalendarClock className="w-[15px] h-[15px]" />
                    Get Ready for This Session
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default UpcomingSessions;
