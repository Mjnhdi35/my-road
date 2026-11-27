# apps/web

Next.js 16 and React 19 with the App Router (`app/`) and Tailwind 4.

- This Next.js has breaking changes compared with most training data: APIs, conventions and file structure may differ. Before writing code, read the relevant guide in the installed docs at `node_modules/next/dist/docs/` in the repository root (dependencies are hoisted), and heed deprecation notices.
- No tests yet: verify with `npx tsc --noEmit -p apps/web` from the root and by running the app.
- `agentRules: false` in `next.config.ts` stops `next dev` from writing an `AGENTS.md` here. Keep it, so this file stays the only instruction source for the app.
