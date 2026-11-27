# CLAUDE.md

Monorepo on npm workspaces, built incrementally toward self-hosted operation on Linux VPS infrastructure.

- `apps/server`: NestJS 12 API (Express, ESM, Vitest).
- `apps/web`: Next.js 16 and React 19 frontend (App Router, Tailwind 4).

Each app's `CLAUDE.md` loads when you work in that app and holds framework guidance only. Agent conduct and Git rules are defined here and nowhere else.

## Decisions

- Classify architectural information as APPROVED, IN PROGRESS, UNDECIDED or PROPOSED. Only APPROVED and IN PROGRESS items are requirements. When code differs from an approved decision, report the discrepancy before changing it. When unsure, ask.
- Always distinguish the current implementation from intended future architecture. Deployment architecture is UNDECIDED; Docker may be used in development.
- Do not add frameworks, libraries, tools, infrastructure, shared packages or abstractions without a justified need and explicit approval.
- Prefer simple, self-hostable, debuggable solutions. Do not assume managed cloud services or container orchestration. Weigh security, resource use, backup, monitoring and rollback for infrastructure choices.
- Check the official docs for the installed version before relying on an API. Never assume undocumented behavior or invent conventions.
- Keep documentation consistent with the implementation and approved decisions, record decisions with their rationale, and never document proposals as established architecture.
- Never deploy, modify production infrastructure or data, or expose or commit secrets without explicit authorization.

## Commands

Run from the repository root. There is one root `package-lock.json` and dependencies are hoisted to the root `node_modules/`.

- Lint everything: `npm run lint`
- Lint the server with type-aware rules: `npm run lint -w server`
- Check formatting: `npm run format:check`, or `npx oxfmt --check <files>`; format files: `npx oxfmt <files>`
- Typecheck: `npx tsc --noEmit -p apps/server` and `npx tsc --noEmit -p apps/web`
- Server tests: `npm test -w server` (unit), `npm run test:e2e -w server` (e2e)
- Server build: `npm run build -w server`

## Gotchas

- oxfmt is the only formatter. `npm run format:check` already fails on most existing files, so format only the files you change and never reformat the whole repository. Do not run `npm run format -w server`: it is leftover Prettier and conflicts with oxfmt.
- Root `npm run lint` does not pass `--type-aware`, so rules such as `typescript/no-floating-promises` run only through `npm run lint -w server`.
- `apps/web` has no tests yet.
- oxlint and oxfmt ignore `.claude/`.

## Verification

Every change needs a check that proves it. Run the relevant commands above for each app you touched, report their results as evidence, and state what could not be verified.

## Skills

Repository skills live only in the root `.claude/skills/`. Never create skill folders inside an app. Do not copy skill content into `CLAUDE.md` files.

The `nestjs*` skills are vendor-managed by `@nestjs/skills` (each folder has a `.nestjs-skills` marker): do not edit them. To update them, run `npx @nestjs/skills add --agent claude` from the repository root, never from `apps/server`.

## Agent conduct

- Act only on what the current prompt explicitly requests. Suggestions are fine; acting on one needs the user's go-ahead. Ask before acting when a request is ambiguous or has side effects (installing packages, migrations, state-changing network calls, deleting files).
- For significant or architectural work: inspect the relevant code, propose the simplest option with alternatives and a verification plan, get approval, then implement only the approved scope.
- Stay in scope: no unrelated refactoring, formatting, reordering, whitespace or line-ending changes. Preserve each file's style and line endings.
- No AI or agent attribution anywhere: commits, pull requests, branch names, code comments or project documentation. Only agent configuration (`CLAUDE.md`, `.claude/`) may name the tool. Commit and pull request attribution is also disabled in `.claude/settings.json`.
- Leave no agent artifacts in the repository (scratch files, notes, logs, plans, temporary scripts). Keep temporary files outside it and delete them when done.
- Before finishing a task that changed files, run `git status` and `git diff` and report the touched files and what remains unstaged, uncommitted or unpushed.

## Git

- Never stage, commit, push, create, switch, rename or delete branches, or create, modify or remove worktrees unless the current request explicitly instructs it. Approval of one action does not extend to later ones. Never touch another session's worktree or branch.
- Remote is `origin` (`git@github.com:Mjnhdi35/my-road.git`), default branch `main`. Never commit or push to `main` directly; changes reach it through a pull request. Base new work on the latest `origin/main`.
- Branches use lowercase kebab-case: `feature/<issue>-<description>`, `fix/<issue>-<description>` (issue number required), `hotfix/`, `refactor/`, `docs/`, `test/` or `chore/<description>`. Include the issue number whenever one exists. Never use the `claude/` prefix or AI, model or session names. Reuse the current branch if it already follows this convention.
- Commits use Conventional Commits, `<type>: <description>` in lowercase imperative mood, with types `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `build`, `ci`. One logical change per commit. Never amend, rebase or rewrite commits unless asked, never change `user.name` or `user.email`, and never use `--no-verify` or bypass signing.
- Pull requests target `main` on `origin`, with a Conventional Commits title and `Closes #<issue>` when an issue exists. Never merge or enable auto-merge without explicit approval. Never force push, including `--force-with-lease`.
- Worktrees: create one only when instructed, one per task, outside the repository in `../my-road-worktrees/`, named after the branch with `/` replaced by `-`, for example `git worktree add ../my-road-worktrees/feature-101-user-auth -b feature/101-user-auth origin/main`. Never reset, clean or stash-pop in another worktree; the stash is shared, so use a uniquely named entry or a temporary commit. Remove only a worktree you created, after the user confirms its work is merged or unneeded, and never one with uncommitted or unpushed changes (check `git -C <path> status`).
- Claude Desktop session worktrees live in `.claude/worktrees/` on `claude/<session-name>` branches managed by the app. Do not rename them or remove them from inside the session; archiving the session removes them. Before pushing or opening a pull request from one, ask the user before creating a correctly named branch.
