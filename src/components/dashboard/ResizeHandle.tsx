import type { ResizeHandleProps } from '../../types/dashboard.types';

/**
 * Vertical drag gutter between the main content and the docked chat panel.
 *
 * The visible gutter is deliberately thin; an overlaid, wider transparent strip
 * gives it a comfortable hit area without pushing the columns apart.
 */
export function ResizeHandle({
  bindings,
  isResizing = false,
  className = '',
}: ResizeHandleProps) {
  return (
    <div
      {...bindings}
      className={`group relative z-20 flex w-1.5 shrink-0 cursor-col-resize items-center justify-center bg-slate-100 transition-colors focus:outline-none ${
        isResizing ? 'bg-brand-blue/70' : 'hover:bg-brand-blue/30 focus-visible:bg-brand-blue/50'
      } ${className}`}
      title="Drag to resize the assistant — double-click to reset"
    >
      {/* Invisible 13px grab strip centred on the gutter. */}
      <span aria-hidden className="absolute inset-y-0 -left-1.5 -right-1" />
      {/* Grip pill: subtle at rest, solid while dragging. */}
      <span
        aria-hidden
        className={`pointer-events-none h-9 w-[3px] rounded-full transition-colors ${
          isResizing ? 'bg-white' : 'bg-slate-300 group-hover:bg-white'
        }`}
      />
    </div>
  );
}

export default ResizeHandle;
