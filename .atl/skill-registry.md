# Skill Registry

**Project**: danse-macabre
**Last Updated**: 2026-03-31

## User-Level Skills

Located in: `C:/Users/zoran/.config/opencode/skills/`

| Skill | Trigger | Description |
|-------|---------|-------------|
| sdd-init | "sdd init", "iniciar sdd" | Initialize SDD context |
| sdd-explore | "explore", "investigate" | Explore and investigate ideas |
| sdd-propose | "propose", "create proposal" | Create change proposals |
| sdd-spec | "spec", "write specs" | Write specifications |
| sdd-design | "design", "technical design" | Create technical design |
| sdd-tasks | "tasks", "breakdown" | Break down into tasks |
| sdd-apply | "apply", "implement" | Implement code changes |
| sdd-verify | "verify", "validate" | Validate against specs |
| sdd-archive | "archive", "close change" | Archive completed changes |
| branch-pr | PR creation | PR workflow (issue-first) |
| issue-creation | Issue creation | Issue workflow (issue-first) |
| go-testing | Go tests | Go testing patterns |
| judgment-day | "judgment day", "adversarial review" | Parallel adversarial review |
| skill-creator | "create skill", "new skill" | Create new AI skills |
| find-skills | "find skill", "how do I" | Discover available skills |

## Project Conventions

- **Architecture**: /client (Next.js) + /api (Nest.js) monorepo
- **Git**: main + develop + feature/* (user manages PRs)
- **Testing**: Strict TDD Mode enabled
- **Persistence**: Hybrid (engram + openspec)

## Compact Rules

### Next.js (client)
- Use App Router with TypeScript
- Server components by default, client components when needed
- API calls via fetch or tanstack-query for complex state

### Nest.js (api)
- Modular architecture with services and controllers
- Prisma for ORM
- RESTful endpoints

### General
- TypeScript strict mode
- ESLint + Prettier
- Tests required before commit (TDD)
