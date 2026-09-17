import {
  ArrowRight,
  BookOpenCheck,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Sparkles,
  Zap,
} from 'lucide-react';
import type {
  ClassroomTool,
  QuickActionsPanelProps,
  ToolCardProps,
} from '../../types/dashboard.types';

/**
 * The four instant tools. This is the primary content area, so the cards are
 * noticeably larger than the original: bigger icon chips, full-size titles,
 * `text-sm` body copy and a taller minimum card height. They render 2-up, so
 * the gradient/outline variants are laid out as a checkerboard.
 */
export const CLASSROOM_TOOLS: ClassroomTool[] = [
  {
    id: 'lesson-plan',
    title: 'Lesson Plan Generator',
    description:
      'Structured 50-minute timeline with objectives, live-coding walkthrough, and rubrics.',
    tag: '50-Min Plan',
    cta: 'Build Plan',
    icon: BookOpenCheck,
    variant: 'gradient',
    prompt: 'Help me prepare a lesson plan for teaching Python loops to beginners.',
    theme: {
      surface: 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white',
      iconChip: 'bg-white/20 backdrop-blur-sm text-white',
      tagChip: 'bg-white/20 text-white',
      body: 'text-emerald-100',
      divider: 'border-white/20',
      cta: 'text-white',
      arrow: 'bg-white text-emerald-700',
      title: 'text-white',
    },
  },
  {
    id: 'next-lesson-prep',
    title: 'Prepare for Next Lesson',
    description:
      'Brief for your next scheduled session: recap, materials checklist, and warmup.',
    tag: 'Up Next',
    cta: 'Get Ready',
    icon: CalendarClock,
    variant: 'outline',
    prompt:
      'Prepare me for my next scheduled lesson: recap what the class covered, list the materials I need, and suggest a warmup.',
    theme: {
      surface: 'bg-white border border-slate-200 hover:border-blue-400',
      iconChip: 'bg-blue-50 border border-blue-200 text-brand-blue',
      tagChip: 'bg-blue-50 text-brand-blue border border-blue-100',
      body: 'text-slate-500',
      divider: 'border-slate-100',
      cta: 'text-brand-blue',
      arrow: 'bg-blue-100 text-blue-700',
      title: 'text-slate-900',
    },
  },
  {
    id: 'homework-quiz',
    title: 'Generate Homework Quiz',
    description:
      'Python & Scratch quizzes with auto-grading rubrics and full solution keys.',
    tag: 'Quiz AI',
    cta: 'Create Quiz',
    icon: CheckCircle2,
    variant: 'outline',
    prompt:
      'Generate a 5-question beginner Python Loop quiz with multiple choice, test solutions, and rubric.',
    theme: {
      surface: 'bg-white border border-slate-200 hover:border-indigo-400',
      iconChip: 'bg-indigo-50 border border-indigo-200 text-indigo-600',
      tagChip: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
      body: 'text-slate-500',
      divider: 'border-slate-100',
      cta: 'text-indigo-600',
      arrow: 'bg-indigo-100 text-indigo-700',
      title: 'text-slate-900',
    },
  },
  {
    id: 'curriculum-review',
    title: 'Review Curriculum',
    description:
      'Audit learning goals, syntax coverage, and lab benchmarks across the track.',
    tag: 'Audit',
    cta: 'Inspect Map',
    icon: ClipboardList,
    variant: 'gradient',
    prompt:
      'Review the learning goals and syntax coverage for my current curriculum track in Grades 4 to 6.',
    theme: {
      surface: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
      iconChip: 'bg-white/20 backdrop-blur-sm text-white',
      tagChip: 'bg-white/20 text-white',
      body: 'text-amber-100',
      divider: 'border-white/20',
      cta: 'text-white',
      arrow: 'bg-white text-orange-700',
      title: 'text-white',
    },
  },
];

export function ToolCard({ tool, onSelect }: ToolCardProps) {
  const { theme, icon: Icon } = tool;

  return (
    <button
      className={`group ${theme.surface} rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden active:scale-[0.99] min-h-[196px] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40`}
      onClick={() => onSelect(tool.prompt)}
      type="button"
    >
      {tool.variant === 'gradient' && (
        <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none group-hover:scale-125 transition-transform" />
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-11 h-11 rounded-xl ${theme.iconChip} flex items-center justify-center`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <span
            className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${theme.tagChip}`}
          >
            {tool.tag}
          </span>
        </div>
        <h3 className={`font-bold text-base tracking-tight mb-1.5 ${theme.title}`}>
          {tool.title}
        </h3>
        <p className={`text-sm leading-relaxed ${theme.body}`}>{tool.description}</p>
      </div>

      <div
        className={`mt-5 pt-3 border-t ${theme.divider} flex items-center justify-between text-[13px] font-semibold ${theme.cta}`}
      >
        <span>{tool.cta}</span>
        <span
          className={`w-7 h-7 rounded-full ${theme.arrow} flex items-center justify-center group-hover:translate-x-0.5 transition-transform`}
        >
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </button>
  );
}

/**
 * Primary content area: "Instant Classroom Tools". Clicking a card pushes its
 * prompt into the docked assistant composer on the right.
 */
export function QuickActionsPanel({
  tools = CLASSROOM_TOOLS,
  onToolSelect,
  heading = 'Instant Classroom Tools',
  subheading = 'AI-accelerated lesson planning, session prep, homework, and curriculum review.',
}: QuickActionsPanelProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
              <Zap className="w-4 h-4" />
            </span>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">{heading}</h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-brand-blue uppercase tracking-wider">
              {tools.length} Ready Tools
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">{subheading}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5 font-medium bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
            <Sparkles className="w-[15px] h-[15px] text-brand-blue" />
            Click any tool to launch in Assistant
          </span>
        </div>
      </div>

      {/* Prominent interactive tool grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {tools.map((tool) => (
          <ToolCard key={tool.id} onSelect={onToolSelect} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default QuickActionsPanel;
