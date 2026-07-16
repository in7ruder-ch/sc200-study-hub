# SC-200 Study Hub

Interactive study reference for the Microsoft SC-200 exam. This Next.js application is the product foundation that will gradually replace the original single-file HTML reference.

## Current vertical slice

- Responsive application shell
- Static locale routes: `/en` and `/es`
- System, light, and dark themes
- All 9 learning paths migrated as structured JSON: 54 modules and 404 units
- Interactive exam blueprint: 3 domains, 9 functional groups, 54 objectives, coverage filters, and links into study modules
- Multi-module study workspace with units closed by default
- Guest progress stored locally through a repository interface
- Official Microsoft Learn resources preserved in the unit content

The Spanish route currently localizes the interface. Study notes remain in English until their Spanish content is authored and reviewed.

## Commands

```bash
pnpm dev
pnpm lint
pnpm build
```

Open `http://localhost:3000`; the root redirects to `/en`.

## Architecture direction

Public study content stays versioned in the repository and can be statically rendered. User-specific data is isolated behind repository interfaces so the local guest implementation can later be paired with Supabase Auth, Postgres, and Row Level Security without coupling the learning content to the database.

Planned user data includes progress, bookmarks, notes, quiz attempts, locale, and theme preference. A signed-in progress repository can synchronize those records while retaining the local repository for guests.

## Content migration

`scripts/extract-learning-path.py <number>` converts a learning path from the preserved HTML source into structured JSON. It is a migration utility, not a runtime dependency. The original path-one extractor remains available for reproducibility.

`scripts/extract-blueprint.py` converts the exam domains, objectives, coverage statuses, and study-note mappings into `src/content/exam-blueprint.json`.
