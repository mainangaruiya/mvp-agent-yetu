import { Clock, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import type {
  SessionStatus,
  UpcomingSession,
  UpcomingSessionsProps,
} from '../../types/dashboard.types';

export const UPCOMING_SESSIONS: UpcomingSession[] = [
  {
    id: 'python-intro',
    module: 'Module 3',
    title: 'Python Introduction & Variables',
    time: 'Today, 02:00 PM',
    studentCount: 14,
    status: 'ready',
    dotClass: 'bg-brand-blue',
  },
  {
    id: 'scratch-basics',
    module: 'Scratch Juniors',
    title: 'Scratch Game Design Basics',
    time: 'Tomorrow, 09:30 AM',
    studentCount: 18,
    status: 'in-prep',
    dotClass: 'bg-purple-600',
  },
  {
    id: 'trainer-sync',
    module: 'Staff Sync',
    title: 'Trainer Sync & Reviews',
    time: 'Friday, 04:00 PM',
    studentCount: 8,
    status: 'scheduled',
    dotClass: 'bg-brand-orange',
  },
];

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

/** "Your Upcoming Sessions" — extracted from the original right column. */
export function UpcomingSessions({
  sessions = UPCOMING_SESSIONS,
  scheduleHref = '#view-calendar',
  columns = 3,
}: UpcomingSessionsProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <span>Your Upcoming Sessions</span>
          <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold lowercase">
            {sessions.length} scheduled
          </span>
        </h2>
        <a
          className="text-xs font-semibold text-brand-blue hover:underline"
          href={scheduleHref}
        >
          View Full Schedule →
        </a>
      </div>

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
                    <span className={`w-2.5 h-2.5 rounded-full ${session.dotClass}`} />
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
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default UpcomingSessions;
