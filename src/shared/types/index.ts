/**
 * Generic, cross-cutting type helpers. Nothing feature-specific belongs here —
 * feature types live in `features/<feat-name>/lib/types`.
 */

export type Nullable<T> = T | null

export type WithId<T> = T & { id: string }
