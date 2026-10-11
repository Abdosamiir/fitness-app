# React + TypeScript + Vite + shadcn/ui

This is a template for a new Vite project with React, TypeScript, and shadcn/ui.

## Deploying to Vercel

Include the root `vercel.json` in your Git commit and deploy from the directory
containing `package.json`. It selects the Vite preset, runs `npm run build`, serves
`dist`, and rewrites application URLs to `index.html` so React Router can resolve
direct visits and refreshes such as `/login`, `/register`, and `/healthy`.

Vite handles this fallback automatically in development. Without the rewrite in
the deployed project, Vercel looks for a file at the requested URL and returns
`404 NOT_FOUND` before the app loads. Redeploy after changing this configuration.

The Smart Coach widget appears throughout the main app. Its existing Gemini
integration requires `VITE_GEMINI_API_KEY` in the Vercel build environment to
generate replies; the widget can open without it.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `src/components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
