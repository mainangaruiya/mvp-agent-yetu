# CodeYetu Instructor Hub

Instructor-facing dashboard for CodeYetu, built around the **AgentYetu** teaching
assistant. Instant Classroom Tools occupy the primary content area; the assistant
chat is docked on the right edge, and the split between the two is drag-resizable
(double-click the gutter to reset).

Refactored from a single-file HTML prototype (`code.txt`) into a modular
React + TypeScript app.

> **Status:** UI complete, backend not yet wired. All sample content has been
> removed — the app renders loading and empty states until the stubs in
> [`src/hooks/useDashboardData.ts`](src/hooks/useDashboardData.ts) are
> implemented. See [Integration](#integration).

---

## Stack

| | |
|---|---|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | `lucide-react` |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run build` | Typecheck, then production build to `dist/` |
| `npm run preview` | Serve the production build locally |

---

## Layout

```
┌──────────┬───────────────────────────────────┬╌┬────────────┐
│ Sidebar  │ Header                            │ │            │
│ (240px)  ├───────────────────────────────────┤ │ ChatPanel  │
│          │ QuickActionsPanel (primary)       │ │ (resizable)│
│          │ UpcomingSessions │ RecentChats    │ │   docked   │
└──────────┴───────────────────────────────────┴╌┴────────────┘
                                    drag handle ┘
```

Only two regions scroll: the main content column and the chat message body.
Everything else is pinned via `shrink-0`.

### Resizing the chat dock

`useResizablePanel` owns the dock width; `ResizeHandle` is the gutter between
the two columns. Drag it to trade space between the tools grid and the chat.

| Gesture | Effect |
|---|---|
| Drag left / right | Widen / narrow the chat panel |
| Double-click, or <kbd>Enter</kbd> | Reset to the 380px default |
| <kbd>←</kbd> / <kbd>→</kbd> (handle focused) | Nudge by 24px |
| <kbd>Home</kbd> / <kbd>End</kbd> | Jump to widest / narrowest |

The width is clamped to 320–820px and additionally capped so the main column
never drops below 460px — a `ResizeObserver` re-clamps when the window shrinks.
The chosen width persists in `localStorage` under `agentyetu:chat-width`.

---

## Project structure

```
src/
├── main.tsx                        App entry — mounts <Dashboard />
├── index.css                       Tailwind directives + custom scrollbar styles
├── vite-env.d.ts                   Vite client types (asset module declarations)
│
├── assets/
│   └── logo.ts                     Re-exports the root "CodeYetu Logo.png"
│
├── types/
│   └── dashboard.types.ts          All shared interfaces and prop types
│
├── hooks/
│   ├── useDashboardData.ts         ⚠ INTEGRATION POINT — all API stubs
│   └── useResizablePanel.ts        Drag-to-resize width for the chat dock
│
└── components/
    ├── dashboard/
    │   ├── Dashboard.tsx           Layout container + chat state (composition root)
    │   ├── Sidebar.tsx             Left navigation
    │   ├── Header.tsx              Top header bar
    │   ├── QuickActionsPanel.tsx   "Instant Classroom Tools" grid
    │   ├── ResizeHandle.tsx        Drag gutter between content and chat
    │   ├── ChatPanel.tsx           Docked AgentYetu assistant chat
    │   ├── UpcomingSessions.tsx    "Your Upcoming Sessions"
    │   └── RecentChats.tsx         "Recent Assist Chats"
    │
    └── ui/
        ├── Card.tsx                Shared rounded / soft-shadow surface
        └── Button.tsx              Shared button (primary, secondary, ghost, icon, pill)
```

### Conventions

- **Props are typed centrally.** Every component prop interface lives in
  `src/types/dashboard.types.ts` — no inline prop typing.
- **`Dashboard.tsx` is the only assembler.** Child components never import each
  other's layout; they receive data and callbacks as props.
- **Components are presentational.** None of them fetch. Sessions, recent chats,
  the conversation and the profile all arrive as props from `Dashboard.tsx`,
  which reads them from a single hook.
- **Static config vs. backend data.** Navigation items, the four tool definitions
  (`CLASSROOM_TOOLS`) and the quick-prompt pills (`QUICK_PROMPTS`) are UI config
  and live in code. Everything a backend owns is fetched.
- **The logo is referenced, not copied.** `src/assets/logo.ts` imports
  `../../CodeYetu Logo.png` from the project root. Change the path in that one
  file if the asset moves.

---

## Integration

Everything the backend owns flows through one file:
**`src/hooks/useDashboardData.ts`**. It exports `useDashboardData()`, which
satisfies the `DashboardData` contract in `dashboard.types.ts`:

```ts
interface DashboardData {
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
```

Inside the hook are five stubs, each marked `TODO(integration)`. They currently
resolve to `null` / `[]`, which is why the UI shows empty states:

| Stub | Suggested endpoint | Returns |
|---|---|---|
| `fetchProfile` | `GET /api/me` | `InstructorProfile \| null` |
| `fetchUpcomingSessions` | `GET /api/sessions/upcoming` | `UpcomingSession[]` |
| `fetchRecentChats` | `GET /api/assistant/conversations/recent` | `RecentChat[]` |
| `fetchConversation` | `GET /api/assistant/conversations/current` | `ChatMessage[]` |
| `postAssistantMessage` | `POST /api/assistant/messages` | `ChatMessage \| null` |

Also set `API_BASE_URL` at the top of the file (e.g. from
`import.meta.env.VITE_API_URL`).

Replacing those five bodies is the entire integration — no component changes
required. Loading flags, optimistic user messages, the typing indicator and
error surfacing are already handled.

To render the dashboard against your own data source instead (tests, Storybook,
a different state library), bypass the hook by passing the contract directly:

```tsx
<Dashboard data={myDashboardData} />
```

### Placeholder states

| Region | No data | Loading |
|---|---|---|
| Header profile | Monogram / generic avatar | Pulsing name + role bars |
| Upcoming Sessions | Dashed "No upcoming sessions" card | Skeleton session cards |
| Recent Assist Chats | Dashed "No recent chats" card | Skeleton rows |
| Chat thread | "Start a conversation" prompt | Skeleton bubbles |
| Assistant replying | — | Animated typing indicator |

Errors from the hook render as a red banner at the top of the main column. The
send button is disabled while a reply is pending or the composer is empty.

---

## How the pieces talk

```
QuickActionsPanel ──onToolSelect──┐
                                  ├──> setDraft ──> ChatPanel (controlled composer)
RecentChats ──────onChatSelect────┘

ChatPanel ──onSend──> Dashboard ──sendMessage──> useDashboardData ──> API
```

Clicking any tool card or recent-chat row prefills the assistant composer with
that item's prompt and focuses it. Submitting appends the user's bubble
optimistically and flips `isResponding` until the API responds.

### Chat message model

Assistant messages are composed of typed blocks rather than raw HTML, so rich
responses stay renderable and type-safe. Map your API response onto these:

| Block | Renders |
|---|---|
| `text` | Paragraph, with optional bold `highlight` and `suffix` |
| `lessonPlan` | Objective + timeline breakdown card |
| `gameRules` | Numbered rules card with optional inline code |
| `notice` | Green confirmation callout |

Add a new block kind in `dashboard.types.ts`, then handle it in the `Block`
switch in `ChatPanel.tsx` — TypeScript will flag the missing case.

---

## Theming

Brand colours are defined in `tailwind.config.js`:

| Token | Value |
|---|---|
| `brand-blue` | `#2563EB` |
| `brand-navy` | `#0F172A` |
| `brand-orange` | `#F97316` |
| `brand-purple` | `#7C3AED` |
| `brand-emerald` | `#10B981` |
| `brand-cyan` | `#06B6D4` |
| `brand-pink` | `#E11D48` |

> The original prototype used `#1D68F2` for the blue accent. It is set to
> `#2563EB` here per the refactor spec — change `theme.extend.colors.brand.blue`
> in `tailwind.config.js` to revert.

Tool card colours are data, not classes scattered through JSX: each entry in
`CLASSROOM_TOOLS` carries a `theme` object (`surface`, `iconChip`, `tagChip`,
`body`, `divider`, `cta`, `arrow`, `title`) of Tailwind class strings. Add a tool
by appending one object to that array.

---

## Notes

- `code.txt` is the original HTML prototype, kept for reference. It is not part
  of the build.
- `UpcomingSession.accentClass` is an optional Tailwind class for the module
  dot. The API does not need to send it — it falls back to `bg-brand-blue`.
