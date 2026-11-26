CLAUDE.md

This file defines the working rules and architectural boundaries for Claude Code in this repository.

Project Context

This project is being built from the ground up and developed incrementally.

The long-term goal is a self-hosted Node.js monorepo operated on Linux VPS infrastructure.

The repository currently contains:

apps/server — NestJS backend API.
apps/web — Next.js frontend.

Docker images and containers may be used during development and early deployment. The long-term deployment architecture is not yet fully defined.

Always distinguish the current implementation from the intended future architecture.

Engineering Principles
Do not introduce frameworks, libraries, tools, or infrastructure without a justified requirement and explicit approval.
Do not independently change approved architectural decisions.
Do not create unnecessary abstractions, shared packages, or generic frameworks prematurely.
Prefer simple, maintainable, self-hostable, and debuggable solutions.
Do not expand the requested scope without permission.
Check official documentation for the exact installed framework and library versions before implementation.
Never assume undocumented behavior or invent architectural conventions.
Architecture Decision Status

Classify architectural information into four states:

APPROVED — Explicitly agreed decisions.
IN PROGRESS — Currently being implemented.
UNDECIDED — Not yet agreed upon.
PROPOSED — Suggestions awaiting approval.

Never treat PROPOSED or UNDECIDED items as implementation requirements.

When implementation differs from an approved decision, identify the discrepancy before changing it.

Working Method

For significant tasks:

Inspect relevant source code, configuration, and documentation.
Understand existing dependencies and architectural boundaries.
Identify risks and potential impact.
Propose the simplest viable implementation and relevant alternatives.
Explain how the changes will be verified.
Obtain approval before significant architectural changes.
Implement only the approved scope.
Report changes, verification results, and remaining limitations.

Small requested changes that follow established conventions may proceed without a separate proposal. Nothing proceeds unless it was requested (see Agent Conduct).

Every meaningful change must have an appropriate verification strategy.

Infrastructure & Production Safety

The project prioritizes independent operation on Linux VPS infrastructure.

Consider operational complexity, security, resource consumption, reliability, backup and recovery, monitoring, and rollback when evaluating infrastructure decisions.

Do not assume managed cloud services or container orchestration platforms are required.
Do not deploy to a VPS or modify production infrastructure without explicit authorization.
Do not expose secrets or commit environment-specific credentials.
Do not modify production data without explicit authorization.
Documentation

Keep documentation consistent with actual implementation and approved decisions.

Update relevant architecture documentation when an approved decision changes.
Document important decisions and their rationale.
Avoid duplicating information already maintained in module-level documentation.
Clearly distinguish current implementation from future plans.
Do not document proposals as established architecture.
Repository Guidance
Inspect the relevant app's CLAUDE.md and AGENTS.md before working in that app.
apps/server/CLAUDE.md references its local AGENTS.md.
Follow the Next.js-specific instructions in apps/web/AGENTS.md.
Each application currently has its own npm configuration and dependency lockfile.
Run application commands from the corresponding app directory.
Agent conduct and Git conventions are repository-wide and defined only in the Agent Conduct and Git Workflow sections below. App-level CLAUDE.md, AGENTS.md and skills hold framework guidance only and must not redefine them.

When uncertain about an architectural decision, ask before proceeding.

Agent Conduct

These rules apply to every coding agent working in this repository and take precedence over default agent behaviour. Where another instruction in this file or an app-level file is less strict, this section wins.

Scope and confirmation
Act only on what the user explicitly requests in the current prompt. Do not generate code, edit files, refactor, reformat or run extra tasks that were not requested.
Suggestions are allowed in replies. Acting on a suggestion requires the user's explicit go-ahead.
When a request is ambiguous, or an action has side effects (installing packages, running migrations, state-changing network calls, deleting files), stop and ask before acting.
Keep every change strictly within the requested scope: no unrelated formatting, reordering, whitespace or line-ending changes. Preserve each file's existing style and line endings.

Git and worktree actions
Never stage, commit, push, create, switch, rename or delete branches, or create, modify or remove worktrees, unless the user explicitly instructs that action in the current request. Approval of one action does not extend to later ones.
Never touch another worktree or another session's branch.

No authorship traces
Never add AI or agent attribution anywhere: no co-author trailers, commit or pull request footers, session IDs or links, or model or tool names in commits, pull request titles or descriptions, branch names, code comments or project documentation.
The only exception is agent configuration files (CLAUDE.md, AGENTS.md and .claude/), which necessarily name the tool they configure.
Do not leave agent artifacts in the repository: no scratch files, notes, logs, plans or temporary scripts. Keep temporary files outside the repository and remove them when the task is done.
Do not leave leftover worktrees. Remove a worktree you created only after the user confirms its work is merged or no longer needed, and never one with uncommitted or unpushed changes. Desktop-managed session worktrees are removed by archiving the session in the app.

Reporting
Before finishing any task that changed files, run git status and git diff, and report exactly which files were touched and what remains unstaged, uncommitted or unpushed.

Git Workflow

These rules apply to every app and every session in this repository.

Remote and branches
Use the configured origin remote (git@github.com:Mjnhdi35/my-road.git).
The default branch is main. Base new work on the latest origin/main.
main is protected: never commit or push to it directly. All changes reach main through a pull request.

Branch naming
Use lowercase kebab-case with one of these prefixes:
feature/<issue-number>-<description> (example: feature/101-user-auth)
fix/<issue-number>-<description> (example: fix/102-payment-error)
hotfix/<description>
refactor/<description> (example: refactor/database-layer)
docs/<description> (example: docs/api-documentation)
test/<description>
chore/<description> (example: chore/update-dependencies)
Include the GitHub issue number when one exists; feature/ and fix/ branches should always have one.
Never put Claude, AI, model names or session IDs in a branch name, and never choose the claude/ prefix yourself.
If the current task branch already follows this convention, reuse it instead of creating another.
Never rename, delete or reset a branch that belongs to another session or worktree.
Create, switch, rename or delete branches only when the user explicitly instructs it.

Commits
Use Conventional Commits: <type>: <short description>, in lowercase imperative mood.
Allowed types: feat, fix, refactor, test, docs, chore, perf, build, ci.
Examples: feat: add user authentication, fix: handle payment timeout, perf: optimize database queries.
Make one logical change per commit, with a short descriptive message.
Stage, commit or push only when the user explicitly instructs it.
Never amend, rebase or otherwise rewrite existing commits unless explicitly asked.
Keep the user's existing Git identity: never change user.name or user.email.
No AI attribution: no Co-Authored-By trailers, no "Generated with Claude Code" footers, no session links. This is enforced by the attribution setting in .claude/settings.json.
Never skip hooks (--no-verify) or bypass commit signing.

Pull requests
Open pull requests against main on origin.
Use a descriptive title in Conventional Commits form, for example feat: add user authentication.
Link the GitHub issue in the description (Closes #101) when one exists.
No AI attribution in pull request titles or descriptions.
Never merge a pull request, or enable auto-merge, without the user's explicit approval.
Never force push (including --force-with-lease) to any branch.

Worktrees
Create a worktree only when the user explicitly instructs it.
Use one worktree per task, each in its own working directory.
Create worktrees outside the repository, in ../my-road-worktrees/, named after the branch with / replaced by -:
git worktree add ../my-road-worktrees/feature-101-user-auth -b feature/101-user-auth origin/main
Do not create worktrees inside the repository unless explicitly asked.
Never switch branches in a worktree that belongs to another task.
Never reset, clean or stash-pop in another worktree. The stash is shared by all worktrees: use a uniquely named stash entry, or a temporary commit, and never a bare git stash pop.
Never remove the current worktree, or any worktree with uncommitted or unpushed changes. Check git -C <path> status first.

Claude Desktop-managed worktrees
Claude Desktop creates its own session worktrees in .claude/worktrees/ on branches named claude/<session-name>. The app sets the name and location; these instructions cannot rename or move them.
Treat such a branch as a temporary session branch. Do not rename it or remove its worktree from inside the session.
When the work should be pushed or opened as a pull request, ask the user before creating a correctly named branch for it (for example git switch -c chore/<description>).
