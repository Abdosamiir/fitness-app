# Architecture — feature-based folders

Three layers, imports flow **one direction only**:

```
pages/  (routes, thin)  →  features/<feat-name>/  (owns a feature end-to-end)  →  shared/  (generic, cross-cutting)
```

`pages/` is the "routes" layer (the `app/` layer in the feature-based-folder skill,
renamed here because this is a Vite SPA, not the Next.js App Router).

- `pages/` may import from `features/` and `shared/`.
- `features/<feat-name>/` may import from `shared/` and its **own** folder — never from
  another feature, never from `pages/`.
- `shared/` imports from nothing above it. **`shared/*` must never import from `features/*`.**

One import alias: `@/` → `src/`.

## Layout

```
src/
  pages/                               # routing concerns only — no business logic
    routes.ts                          # ROUTES + NAV_ITEMS — the ONLY place route paths live
    router.tsx                         # createBrowserRouter([...]) (React Router data mode)
    providers.tsx                      # AppProviders — every app-wide provider, mounted once
    protected-route.tsx                # route-level auth gate (wraps the app layout)
    app-layout.tsx                     # layout route for signed-in pages: header + nav + <Outlet />
    home/page.tsx                      # thin wrapper — renders a feature module
    auth/
      layout.tsx                       # layout route for /login etc.: split screen + <Outlet />
      login/page.tsx                   # thin wrapper — renders the auth feature's login module
  features/
    <feat-name>/
      components/
        <feat-name>-module.tsx         # top-level composition for a route / tab set
        <tab>-tab.tsx                  # flat siblings, not nested under a tabs/ folder
        <name>.tsx                     # any other feature-only component (forms, items, lists)
        <name>-provider.tsx            # feature-owned context (createContext + Provider + use<Name>())
      data/
        <feat-name>-mock.ts            # fixtures, until a real API exists
      lib/
        api/<resource>.ts             # raw calls — exports `<resource>Api`, no React
        queries/<resource>.ts         # useQuery hooks: use<Resource>()
        mutations/<resource>.ts       # useMutation hooks: invalidate via the query-key factory
        schema/<resource>.ts          # zod schemas (only when a form needs one)
        types/<resource>.d.ts         # + barrel re-export from lib/types/index.ts
        constants/query-keys.ts       # ONE key-factory object per feature
        hooks/                        # feature-specific non-data hooks (add when needed)
  shared/
    components/ui/                    # generic design-system primitives (button, input, …)
    providers/                        # generic app-wide providers (theme, query client)
    lib/                             # generic utilities (cn, …)
    types/                           # generic type helpers
    hooks/                           # generic hooks (add when needed)
```

## Where does X go

| Adding… | Path |
|---|---|
| A route | `pages/<feat-name>/page.tsx` — thin; register it in `pages/router.tsx` with a path from `pages/routes.ts` |
| A feature's main screen | `features/<feat-name>/components/<feat-name>-module.tsx` |
| Tab / section content | `features/<feat-name>/components/<name>-tab.tsx` (flat, sibling to the module) |
| Any other feature-only component | `features/<feat-name>/components/<name>.tsx` — **default location for most components** |
| Feature-only React context | `features/<feat-name>/components/<name>-provider.tsx` (context + provider + hook in one file) |
| Mock / fixture data | `features/<feat-name>/data/<feat-name>-mock.ts` (one file per feature) |
| An API call | `features/<feat-name>/lib/api/<resource>.ts` (no React here) |
| A query hook | `features/<feat-name>/lib/queries/<resource>.ts` |
| A mutation hook | `features/<feat-name>/lib/mutations/<resource>.ts` |
| Query keys | the feature's existing `lib/constants/query-keys.ts` — never a new file per resource |
| Types | `lib/types/<resource>.d.ts`, re-exported from `lib/types/index.ts` |
| A validation schema | `lib/schema/<resource>.ts` (only when a form needs it) |
| An app-wide, generic provider | `shared/providers/` — then compose it in `pages/providers.tsx` |
| A shared UI primitive | `shared/components/ui/<name>.tsx` — only once **2+ features** use it (see below) |

## Promotion rule (feature-local → shared)

Default to feature-local. Move a component to `shared/components/ui/` only when a
**second real consumer exists** — never speculatively. When you promote it, strip any
feature-specific type from its props (accept `variant: "success" | "warning" | "danger"`,
not a feature's status enum). If a feature wants a feature-flavored call site, keep a thin
adapter inside that feature.

## When `page.tsx` may be more than a thin wrapper

Routing concerns are allowed in a page: param/searchParam validation, `redirect()` /
`<Navigate>` / `notFound()`, route-level auth/role gating, query prefetch/hydration for
that route, and composing several independent features onto one route. Anything else —
business logic, mutations, UI detail — belongs in a feature component.

## Before adding a new resource

Grep the feature for the resource name and obvious synonyms first. A near-duplicate
resource under a different tab of the same feature is a common source of accidental
duplication.

## This project's instantiation

- **`auth`** — the one feature so far, and the shape to copy:
  - `components/login-module.tsx`, `components/login-form.tsx` (React Hook Form + Zod).
  - `lib/schema/auth.ts` — the login form's Zod schema.
  - `lib/auth-client.ts` — the better-auth browser client (`createAuthClient` from
    `better-auth/react`), re-exporting `signIn` / `signUp` / `signOut` / `useSession` /
    `getSession`. **The better-auth server, database, and endpoints live entirely in a
    separate backend** — this app is client-only. Point it at the backend with
    `VITE_BETTER_AUTH_URL` (see `.env.example`).
  - No `data/`, `api/`, `queries/`, `mutations/`, `constants/`, or `types/` — better-auth's
    client owns session state (its `useSession` hook is reactive, so there is no auth
    provider) and infers its own types.
- **`pages/routes.ts`** owns every route path. **`pages/router.tsx`** wires React Router in
  data mode (`createBrowserRouter` + `<RouterProvider>` in `src/main.tsx`) as **two layout
  route trees**:
  - `auth/layout.tsx` (split screen, no header) → `auth/login/page.tsx`.
  - `protected-route.tsx` (gates on `useSession()`) → `app-layout.tsx` (header + nav) →
    `home/page.tsx` at `/`.
  A new signed-in page is a thin `page.tsx` added as a child of the `app-layout.tsx` route;
  a new auth page is a child of the `auth/layout.tsx` route.
- A future feature that fetches data adds the full `lib/` layout above (`api` / `queries` /
  `mutations` / `constants/query-keys` / `types`) and, if it has forms, `schema`. TanStack
  Query is already wired (`shared/providers/query-provider.tsx`).
