# CodeYetu Instructor Hub

Instructor-facing dashboard for CodeYetu, built around the **AgentYetu** teaching
assistant. Instant Classroom Tools occupy the primary content area; the assistant
chat is docked as a compact panel on the right edge.

Refactored from a single-file HTML prototype (`code.txt`) into a modular
React + TypeScript app.

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
┌──────────┬────────────────────────────────────────┬────────────┐
│ Sidebar  │ Header                                 │            │
│ (240px)  ├────────────────────────────────────────┤ ChatPanel  │
│          │ QuickActionsPanel  (primary content)   │ (340-380px)│
│          │ UpcomingSessions  │  RecentChats       │   docked   │
└──────────┴────────────────────────────────────────┴────────────┘
```

Only two regions scroll: the main content column and the chat message body.
Everything else is pinned via `shrink-0`.

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
└── components/
    ├── dashboard/
    │   ├── Dashboard.tsx           Layout container + chat state (composition root)
    │   ├── Sidebar.tsx             Left navigation
    │   ├── Header.tsx              Top header bar
    │   ├── QuickActionsPanel.tsx   "Instant Classroom Tools" grid
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
- **Content is data, not markup.** Tools, sessions, recent chats and the seeded
  chat thread are exported arrays (`CLASSROOM_TOOLS`, `UPCOMING_SESSIONS`,
  `RECENT_CHATS`, `SEED_MESSAGES`) that can be swapped for API data without
  touching JSX.
- **The logo is referenced, not copied.** `src/assets/logo.ts` imports
  `../../CodeYetu Logo.png` from the project root. Change the path in that one
  file if the asset moves.

---

## How the pieces talk

Chat state (`messages`, `draft`) lives in `Dashboard.tsx` and flows down:

```
QuickActionsPanel ──onToolSelect──┐
                                  ├──> setDraft ──> ChatPanel (controlled composer)
RecentChats ──────onChatSelect────┘
```

Clicking any tool card or recent-chat row prefills the assistant composer with
that item's prompt and focuses it. Submitting appends a user bubble and, after a
short delay, a simulated assistant reply.

> **Note:** the assistant response is currently mocked in
> `Dashboard.tsx` (`handleSend`). Wire this to the real API when the backend is
> available.

### Chat message model

Assistant messages are composed of typed blocks rather than raw HTML, so rich
responses stay renderable and type-safe:

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
- The instructor avatar in `Dashboard.tsx` still points at a remote placeholder
  URL and should be replaced with real profile data.
