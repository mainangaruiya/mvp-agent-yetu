import {
  ArrowRight,
  BookOpenCheck,
  Bug,
  CheckCircle2,
  FileText,
  Gamepad2,
  RefreshCw,
  Sparkles,
  Zap,
} from 'lucide-react';
import type {
  ClassroomTool,
  QuickActionsPanelProps,
  ToolCardProps,
} from '../../types/dashboard.types';

/**
 * The six instant tools. Now the primary content area, so the cards are
 * noticeably larger than the original: bigger icon chips, full-size titles,
 * `text-sm` body copy and a taller minimum card height.
 */
export const CLASSROOM_TOOLS: ClassroomTool[] = [
  {
    id: 'homework-quiz',
    title: 'Generate Homework Quiz',
    description:
      'Instant Python & Scratch quizzes with auto-grading rubrics and solution keys.',
    tag: 'Quiz AI',
    cta: 'Create Quiz',
    icon: CheckCircle2,
    variant: 'gradient',
    prompt:
      'Generate a 5-question beginner Python Loop quiz with multiple choice, test solutions, and rubric.',
    theme: {
      surface: 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white',
      iconChip: 'bg-white/20 backdrop-blur-sm text-white',
      tagChip: 'bg-white/20 text-white',
      body: 'text-blue-100',
      divider: 'border-white/20',
      cta: 'text-white',
      arrow: 'bg-white text-blue-700',
      title: 'text-white',
    },
  },
  {
    id: 'scratch-worksheet',
    title: 'Create Scratch Worksheet',
    description:
      'Block-coding templates, puzzle challenges, and printable PDF student handouts.',
    tag: 'Printables',
    cta: 'Build Worksheet',
    icon: FileText,
    variant: 'gradient',
    prompt:
      'Create a printable Scratch Sprite animation block worksheet with visual sequence puzzles.',
    theme: {
      surface: 'bg-gradient-to-br from-purple-600 to-pink-600 text-white',
      iconChip: 'bg-white/20 backdrop-blur-sm text-white',
      tagChip: 'bg-white/20 text-white',
      body: 'text-purple-100',
      divider: 'border-white/20',
      cta: 'text-white',
      arrow: 'bg-white text-purple-700',
      title: 'text-white',
    },
  },
  {
    id: 'loop-curriculum',
    title: 'Review Loop Curriculum',
    description:
      'Audit learning goals, repeat & range() syntax coverage, and lab benchmarks.',
    tag: 'Audit',
    cta: 'Inspect Map',
    icon: RefreshCw,
    variant: 'outline',
    prompt:
      'Review the learning goals and syntax coverage for beginner loop curriculums in Grades 4 to 6.',
    theme: {
      surface: 'bg-white border border-slate-200 hover:border-amber-400',
      iconChip: 'bg-amber-50 border border-amber-200 text-amber-600',
      tagChip: 'bg-amber-50 text-amber-700 border border-amber-100',
      body: 'text-slate-500',
      divider: 'border-slate-100',
      cta: 'text-brand-orange',
      arrow: 'bg-amber-100 text-amber-700',
      title: 'text-slate-900',
    },
  },
  {
    id: 'lesson-plan',
    title: 'Lesson Plan Generator',
    description:
      '50-minute structured timeline with dynamic warmups, live coding syntax, and rubrics.',
    tag: '50-Min Plan',
    cta: 'Build Plan',
    icon: BookOpenCheck,
    variant: 'outline',
    prompt: 'Help me prepare a lesson plan for teaching Python loops to beginners.',
    theme: {
      surface: 'bg-white border border-slate-200 hover:border-emerald-400',
      iconChip: 'bg-emerald-50 border border-emerald-200 text-emerald-600',
      tagChip: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
      body: 'text-slate-500',
      divider: 'border-slate-100',
      cta: 'text-emerald-600',
      arrow: 'bg-emerald-100 text-emerald-700',
      title: 'text-slate-900',
    },
  },
  {
    id: 'warmup-game',
    title: 'Session Warmup Game',
    description:
      '"Robotic Simon Says" and interactive syntax physical games for young coders.',
    tag: 'Gamified',
    cta: 'Launch Game',
    icon: Gamepad2,
    variant: 'gradient',
    prompt:
      'Tell me how to run the Robotic Simon Says warmup game for teaching code loops.',
    theme: {
      surface: 'bg-gradient-to-br from-rose-500 to-pink-500 text-white',
      iconChip: 'bg-white/20 backdrop-blur-sm text-white',
      tagChip: 'bg-white/20 text-white',
      body: 'text-rose-100',
      divider: 'border-white/20',
      cta: 'text-white',
      arrow: 'bg-white text-rose-700',
      title: 'text-white',
    },
  },
  {
    id: 'debugging-lab',
    title: 'Code Debugging Lab',
    description:
      'Interactive code challenge with syntax spot-the-bug exercises and guided hints.',
    tag: 'Bug Hunt',
    cta: 'Open Lab',
    icon: Bug,
    variant: 'outline',
    prompt: 'Generate a fun spot-the-syntax-bug code lab for kids learning for-loops.',
    theme: {
      surface: 'bg-white border border-slate-200 hover:border-cyan-400',
      iconChip: 'bg-cyan-50 border border-cyan-200 text-cyan-600',
      tagChip: 'bg-cyan-50 text-cyan-700 border border-cyan-100',
      body: 'text-slate-500',
      divider: 'border-slate-100',
      cta: 'text-cyan-600',
      arrow: 'bg-cyan-100 text-cyan-700',
      title: 'text-slate-900',
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
  subheading = 'AI-accelerated lesson creation, interactive puzzles, and real-time student warmups.',
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
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
        {tools.map((tool) => (
          <ToolCard key={tool.id} onSelect={onToolSelect} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default QuickActionsPanel;
