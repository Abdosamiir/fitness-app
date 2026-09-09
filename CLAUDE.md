# fitness-app

Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui, TanStack Query, React Router
(data mode), React Hook Form + Zod, better-auth.

## Folder architecture

Feature-based. Three layers, one-directional imports:
`pages/` (routes, thin) → `features/<feat-name>/` → `shared/` (generic).
`shared/*` must never import from `features/*`. One alias: `@/` → `src/`.

**Read `ARCHITECTURE.md` before adding a page, component, API call, query, mutation,
type, or schema** — it has the full layout and a "where does X go" table. `features/auth`
is the reference feature to copy.

## Conventions

- Route paths live only in `src/pages/routes.ts` — never hardcode a URL or derive one from a
  folder name.
- Forms: React Hook Form + Zod, one schema per resource in `lib/schema/`, shared resolver.
- Server state: TanStack Query. One query-key factory per feature in
  `lib/constants/query-keys.ts`; mutations invalidate through it. Devtools are gated behind
  `import.meta.env.DEV`.
- Tailwind v4 semantic tokens (`bg-primary`, `text-destructive`, `border-border`) — never
  raw hex. Reusable components are `w-full`, sized by the parent. See **Design tokens** below.
- shadcn/ui for primitives; new ones land in `src/shared/components/ui/` (see
  `components.json`).
- Component member order: Translation → Navigation → State → Ref → Context → Query →
  Mutation → Custom hooks → Form → Variables → Functions → Effects, with a section comment
  per group.

## Auth

better-auth, **client-only**. The server, database, and endpoints belong to a separate
backend. `src/features/auth/lib/auth-client.ts` holds `createAuthClient` (from
`better-auth/react`); import `signIn` / `signOut` / `useSession` from there. Set the
backend origin in `.env` as `VITE_BETTER_AUTH_URL` (`.env.example` is committed). No auth
provider — `useSession` is reactive on its own.

## Design tokens

All in `src/index.css`. Derived from the comps in `src/assets/imgs/{light,dark}.png`.

- **Brand ramp** — `--brand-50 … --brand-950`, anchored on `#FF4100` (`brand-500`).
  Theme-independent primitives. Utilities: `bg-brand-600`, `text-brand-500`, …
- **Primary** = `brand-500` (orange) in both themes; `primary-foreground` is near-white.
  `--ring` is the brand too, so focus states are on-brand.
- **Neutrals** — light surface `#F3F3F4` / ink `#242424`; dark surface `#212121` / ink
  `#F3F3F4`. Standard shadcn roles (`background`, `card`, `secondary`, `muted`, `border`, …).
- **Glass** — frosted-panel surface from the comps: `--glass` (white 60% light /
  `#242424` 60% dark), `--glass-border`, `--glass-blur` (86px). Use the `glass` utility
  class: `<div class="glass rounded-xl">`. Or compose with `bg-glass` /
  `border-glass-border` + `backdrop-blur-[86px]`.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build`
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint
- `npm run format` — Prettier
