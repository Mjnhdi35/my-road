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

Small changes that follow established conventions may proceed directly.

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

When uncertain about an architectural decision, ask before proceeding.
