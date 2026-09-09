import { createAuthClient } from "better-auth/react"

/**
 * The better-auth browser client. The server (routes, database, sessions) is
 * owned entirely by the backend — this app only talks to it over HTTP.
 *
 * `baseURL` is that backend's origin; the client appends `/api/auth` unless a
 * `basePath` is set. Configure it with `VITE_BETTER_AUTH_URL` (see `.env.example`);
 * when unset the client falls back to the current origin.
 */
export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL,
})

export const { signIn, signUp, signOut, useSession, getSession } = authClient
