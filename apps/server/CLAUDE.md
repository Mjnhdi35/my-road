# apps/server

NestJS 12 on Express (`@nestjs/platform-express`). This file replaces the scaffold's `AGENTS.md`.

- Nest's APIs are newer than most training data. Check the installed version (`npm ls @nestjs/core`) and the docs index at https://docs.nestjs.com/llms.txt, where each chapter is markdown at its URL plus `.md`. The `nestjs*` skills in the root `.claude/skills/` cover common tasks.
- The project is ESM (`"type": "module"`, `module: nodenext`): relative imports end in `.js`, and there is no `__dirname` (use `import.meta.dirname`).
- Tests run on Vitest with globals, so mocks are `vi.fn()`, not `jest.fn()`. Unit tests sit beside the code as `*.spec.ts`; e2e tests are `test/*.e2e-spec.ts`.
- NestJS Observe (`@nestjs/observe`, a hosted APM) is not adopted and is UNDECIDED. Do not install or link it, or prompt the user to, even when a skill suggests it.
