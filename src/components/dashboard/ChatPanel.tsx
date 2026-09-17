import { useEffect, useRef } from 'react';
import type { FormEvent } from 'react';
import { Bookmark, GraduationCap, Paperclip, RotateCcw, Send, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import type {
  ChatBlock,
  ChatBubbleProps,
  ChatPanelProps,
} from '../../types/dashboard.types';

function Block({ block }: { block: ChatBlock }) {
  switch (block.kind) {
    case 'text':
      return (
        <p className="text-[12px] text-slate-700 leading-relaxed">
          {block.text}
          {block.highlight && <strong> {block.highlight}</strong>}
          {block.suffix}
        </p>
      );

    case 'lessonPlan':
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
          <div>
            <h4 className="font-bold text-xs text-brand-blue">{block.title}</h4>
            <div className="mt-1 text-[11px] text-slate-600">
              <span className="font-bold uppercase text-[10px] text-slate-400 block tracking-wider">
                Core Objective
              </span>
              {block.objective}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-2 space-y-2 text-[11px]">
            <span className="font-bold uppercase text-[10px] text-slate-400 block tracking-wider">
              Timeline Breakdown
            </span>
            {block.timeline.map((entry) => (
              <div className="flex items-start gap-2" key={entry.duration}>
                <span className="font-bold text-brand-blue shrink-0 w-12">
                  {entry.duration}
                </span>
                <div>
                  <strong className="text-slate-800">{entry.title}</strong>
                  <p className="text-slate-500 text-[10.5px]">{entry.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'gameRules':
      return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2 text-[11px] leading-relaxed">
          <h5 className="font-bold text-slate-900 text-xs">{block.title}</h5>
          <ol className="list-decimal pl-4 space-y-1.5 text-slate-600">
            {block.steps.map((step) => (
              <li key={step.text}>
                {step.text}
                {step.code && (
                  <code className="block font-mono text-[11px] text-brand-blue bg-blue-50/80 p-1.5 rounded mt-1 font-semibold border border-blue-100">
                    {step.code}
                  </code>
                )}
              </li>
            ))}
          </ol>
        </div>
      );

    case 'notice':
      return (
        <div className="bg-white border border-emerald-200 rounded-xl p-2.5 text-[11px] text-emerald-800">
          {block.text}
        </div>
      );

    default:
      return null;
  }
}

export function ChatBubble({
  message,
  assistantName = 'AgentYetu Teaching Assistant',
}: ChatBubbleProps) {
  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[88%] bg-brand-blue text-white rounded-2xl rounded-tr-none px-3.5 py-2.5 shadow-xs">
          {message.blocks.map((block, index) =>
            block.kind === 'text' ? (
              <p className="text-[12.5px] leading-relaxed" key={index}>
                {block.text}
              </p>
            ) : null,
          )}
          <span className="block text-[10px] text-blue-200 text-right mt-1 font-medium">
            {message.timestamp}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-start max-w-[96%]">
      <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white shrink-0 mt-0.5">
        <GraduationCap className="w-3.5 h-3.5" />
      </div>
      <div className="bg-slate-100/90 border border-slate-200 rounded-2xl rounded-tl-none p-3 text-slate-800 space-y-2 shadow-xs flex-1 min-w-0">
        <div className="flex items-center justify-between text-[10.5px] gap-2">
          <span className="font-bold uppercase tracking-wider text-brand-blue truncate">
            {assistantName}
          </span>
          <span className="text-slate-400 shrink-0">{message.timestamp}</span>
        </div>
        {message.blocks.map((block, index) => (
          <Block block={block} key={index} />
        ))}
      </div>
    </div>
  );
}

function ThreadSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex justify-end">
        <div className="h-12 w-3/5 rounded-2xl rounded-tr-none bg-slate-200" />
      </div>
      <div className="flex gap-2">
        <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0" />
        <div className="h-24 flex-1 rounded-2xl rounded-tl-none bg-slate-100" />
      </div>
    </div>
  );
}

function EmptyThread() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-5 py-10">
      <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center mb-3">
        <Sparkles className="w-5 h-5 text-brand-blue" />
      </div>
      <p className="text-sm font-bold text-slate-800">Start a conversation</p>
      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
        Pick an Instant Classroom Tool or ask a question below, and the assistant
        will reply here.
      </p>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2 items-start">
      <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white shrink-0 mt-0.5">
        <GraduationCap className="w-3.5 h-3.5" />
      </div>
      <div className="bg-slate-100/90 border border-slate-200 rounded-2xl rounded-tl-none px-3 py-2.5 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
      </div>
    </div>
  );
}

/**
 * Assistant chat, docked to the right edge. `width` is supplied by the drag
 * handle in `Dashboard`; without it the panel falls back to its static 340px
 * (380px on very wide screens) dock width. Header + input dock stay fixed;
 * only the conversation body scrolls.
 */
export function ChatPanel({
  messages,
  draft,
  onDraftChange,
  onSend,
  isResponding = false,
  isLoading = false,
  onBookmark,
  onRefresh,
  assistantName = 'AgentYetu Assistant',
  assistantStatus = 'Always active • Expert Teaching Guide',
  width,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pin to the newest message whenever the thread grows.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, isResponding]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text || isResponding) return;
    onSend(text);
  };

  return (
    <aside
      className={`${
        width === undefined ? 'w-[340px] 2xl:w-[380px]' : ''
      } min-w-[280px] bg-white border-l border-slate-200 flex flex-col shrink-0 h-full select-none z-10`}
      style={width === undefined ? undefined : { width }}
    >
      {/* Assistant header */}
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bg-brand-blue flex items-center justify-center text-white shadow-xs shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
              {assistantName}
            </h3>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate">{assistantStatus}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400 shrink-0">
          <Button
            onClick={onBookmark}
            title="Bookmark conversation"
            variant="icon"
          >
            <Bookmark className="w-[18px] h-[18px]" />
          </Button>
          <Button onClick={onRefresh} title="Refresh conversation" variant="icon">
            <RotateCcw className="w-[18px] h-[18px]" />
          </Button>
        </div>
      </div>

      {/* Scrollable conversation body */}
      <div
        className="flex-1 overflow-y-auto custom-scrollbar p-3.5 space-y-4 text-xs"
        id="dockedChatContainer"
        ref={scrollRef}
      >
        {isLoading ? (
          <ThreadSkeleton />
        ) : messages.length === 0 ? (
          <EmptyThread />
        ) : (
          messages.map((message) => <ChatBubble key={message.id} message={message} />)
        )}

        {isResponding && <TypingIndicator />}
      </div>

      {/* Bottom input dock */}
      <div className="p-3 border-t border-slate-200 bg-white shrink-0">
        <form
          className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-brand-blue/30 focus-within:border-brand-blue transition-all"
          onSubmit={handleSubmit}
        >
          <button
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 shrink-0"
            title="Attach file"
            type="button"
          >
            <Paperclip className="w-[18px] h-[18px]" />
          </button>

          <input
            className="flex-1 min-w-0 bg-transparent border-0 p-0 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
            id="assistantInput"
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="Ask about curriculum or lesson plans..."
            ref={inputRef}
            type="text"
            value={draft}
          />

          <button
            className="w-7 h-7 rounded-full bg-brand-blue text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
            disabled={isResponding || draft.trim().length === 0}
            title="Send message"
            type="submit"
          >
            <Send className="w-[15px] h-[15px]" />
          </button>
        </form>
      </div>
    </aside>
  );
}

export default ChatPanel;
