import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import type {
  ResizablePanel,
  ResizablePanelOptions,
  ResizeHandleBindings,
} from '../types/dashboard.types';

/**
 * Drives a drag-resizable right-hand panel.
 *
 * The panel is docked to the right, so dragging the handle *left* widens it:
 * `width = widthAtDragStart + (pointerXAtDragStart - pointerX)`.
 *
 * The upper bound is whichever is smaller — `maxWidth`, or whatever the row can
 * spare while the main column keeps `minContentWidth`. It is remeasured with a
 * ResizeObserver, so shrinking the window pulls an over-wide panel back in.
 */
export function useResizablePanel({
  containerRef,
  initialWidth = 360,
  minWidth = 320,
  maxWidth = 760,
  minContentWidth = 420,
  step = 24,
  storageKey,
  label = 'Resize assistant panel',
}: ResizablePanelOptions): ResizablePanel {
  const [width, setWidth] = useState(() => readStored(storageKey) ?? initialWidth);
  /** Current upper bound; starts at `maxWidth` until the row is measured. */
  const [limit, setLimit] = useState(maxWidth);
  const [isResizing, setIsResizing] = useState(false);
  const dragStart = useRef({ pointerX: 0, width: 0 });

  const clamp = useCallback(
    (value: number, upper: number) =>
      Math.min(Math.max(Math.round(value), minWidth), Math.max(minWidth, upper)),
    [minWidth],
  );

  // Keep the upper bound in sync with the space the row actually has.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const upper = Math.min(
        maxWidth,
        container.getBoundingClientRect().width - minContentWidth,
      );
      setLimit(Math.max(minWidth, upper));
      setWidth((previous) => clamp(previous, upper));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [clamp, containerRef, maxWidth, minContentWidth, minWidth]);

  // Drag gesture. Listeners live on the window so the pointer can leave the
  // 6px gutter mid-drag without dropping the grab.
  useEffect(() => {
    if (!isResizing) return;

    const handleMove = (event: globalThis.PointerEvent) => {
      const delta = dragStart.current.pointerX - event.clientX;
      setWidth(clamp(dragStart.current.width + delta, limit));
    };
    const stop = () => setIsResizing(false);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    // Hold the resize cursor and kill text selection for the whole gesture,
    // not just while the pointer is over the handle.
    document.body.classList.add('is-resizing');

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
      document.body.classList.remove('is-resizing');
    };
  }, [clamp, isResizing, limit]);

  // Persist once the gesture settles (and after keyboard nudges / reset).
  useEffect(() => {
    if (isResizing) return;
    writeStored(storageKey, width);
  }, [isResizing, storageKey, width]);

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) return;
      event.preventDefault();
      dragStart.current = { pointerX: event.clientX, width };
      setIsResizing(true);
    },
    [width],
  );

  const reset = useCallback(
    () => setWidth(clamp(initialWidth, limit)),
    [clamp, initialWidth, limit],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      // Separator convention: the arrow moves the divider, so Left widens the
      // right-docked panel.
      const nudge =
        event.key === 'ArrowLeft' ? step : event.key === 'ArrowRight' ? -step : 0;

      if (nudge !== 0) {
        event.preventDefault();
        setWidth((previous) => clamp(previous + nudge, limit));
        return;
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setWidth(clamp(limit, limit));
        return;
      }
      if (event.key === 'End') {
        event.preventDefault();
        setWidth(minWidth);
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        reset();
      }
    },
    [clamp, limit, minWidth, reset, step],
  );

  const handleProps: ResizeHandleBindings = {
    role: 'separator',
    'aria-orientation': 'vertical',
    'aria-valuenow': width,
    'aria-valuemin': minWidth,
    'aria-valuemax': limit,
    'aria-label': label,
    tabIndex: 0,
    onPointerDown,
    onKeyDown,
    onDoubleClick: reset,
  };

  return { width, isResizing, handleProps, reset };
}

function readStored(key?: string): number | null {
  if (!key || typeof window === 'undefined') return null;
  try {
    const parsed = Number.parseInt(window.localStorage.getItem(key) ?? '', 10);
    return Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null; // Storage can be blocked (private mode, sandboxed iframe).
  }
}

function writeStored(key: string | undefined, value: number) {
  if (!key || typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    /* Non-fatal: the width just won't survive a reload. */
  }
}

export default useResizablePanel;
