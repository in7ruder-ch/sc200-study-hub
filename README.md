# SC-200 Study Hub

SC-200 Study Hub is an interactive study workspace for the Microsoft Security Operations Analyst certification. It brings the exam blueprint, Microsoft Learn material, guided investigation labs, progress tracking, and decision review into one focused application.

The project was created to solve a practical problem: SC-200 preparation is spread across many learning paths, products, objectives, and investigation workflows. Reading each source independently makes it difficult to understand coverage, retain context, and practice the judgment expected from a security operations analyst. The Study Hub organizes that material into a single experience that remembers progress and connects study content to realistic incident-response decisions.

## What the application includes

### Dashboard and Review Center

- A `00 Dashboard` that combines learning and lab progress.
- Direct links to the active lab and the next incomplete learning path.
- Coverage for all nine SC-200 learning paths.
- A Review Center that identifies risky or limited decisions and returns directly to the relevant lab stage.

### Learning workspace

- Nine structured Microsoft Learn learning paths.
- 54 modules and 404 study units.
- Multi-module study workspaces with collapsible units.
- Unit-level completion tracking.
- Direct links to the corresponding official Microsoft Learn resources.

### Exam blueprint

- Three weighted exam domains.
- Nine functional groups and 54 measured objectives.
- Coverage indicators and filters.
- Direct connections between exam objectives, study notes, and relevant learning modules.
- Navigation that preserves the original blueprint context when opening a reference.

### Practice Labs

Four guided security investigation scenarios covering:

1. Consent phishing and endpoint compromise with Microsoft Defender XDR.
2. Credential abuse and Azure persistence with Microsoft Sentinel.
3. A ransomware attempt with Microsoft Defender for Endpoint.
4. A compromised cloud workload with Microsoft Defender for Cloud.

Each lab contains sequential investigation stages, expandable evidence, decision points, operational feedback, investigation outcomes, key takeaways, and study references. Progress is preserved between sessions.

### Interface

- English and Spanish interface routes at `/en` and `/es`.
- System, light, and dark themes.
- Responsive layouts for desktop and mobile.
- Local-first progress with no account required.

The interface is localized in both languages. All four Practice Labs and all nine Learning Paths are fully translated into Spanish; any remaining supporting content continues to use the automatic English fallback.

## How progress works

Study-unit completion and Practice Lab answers are stored in the browser through repository interfaces backed by `localStorage`. This keeps the current application private and account-free while leaving a clear path toward authenticated cloud synchronization later.

Clearing the browser's site data also clears locally stored progress.

## Technology

- Next.js 16
- React 19
- TypeScript
- CSS with system, light, and dark theme tokens
- Static content versioned in the repository
- Static generation for the English and Spanish routes

## Run locally

Requirements:

- Node.js 20 or newer
- pnpm

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/en`.

Quality checks:

```bash
pnpm lint
pnpm build
```

## Project structure

```text
src/
├── app/                 Next.js routes and global styles
├── components/          Dashboard, blueprint, study hub, and Practice Lab UI
├── content/             Learning paths, exam blueprint, labs, and study packs
└── lib/
    ├── progress/        Local progress repository implementations
    ├── i18n.ts          English and Spanish interface copy
    └── types.ts         Shared content and application types
```

The public study content remains separate from user-specific progress. This allows the content to be statically rendered while progress storage can evolve independently.

## Content tooling

The scripts under `scripts/` convert the preserved source material into structured project content:

- `extract-learning-path.py` extracts a numbered learning path.
- `extract-blueprint.py` extracts exam domains, objectives, coverage states, and study-note mappings.

These scripts support content maintenance and are not runtime dependencies.

## Project direction

Potential future additions include exam simulation mode, attempt history, deeper readiness metrics by exam domain, additional investigation scenarios, and optional account-based synchronization.

## Author

Created by **in7ruder** — [LinkedIn](https://www.linkedin.com/in/mvanarelli/) · [Website](https://in7ruder.com).

## Disclaimer

This is an independent study project. It is not affiliated with, endorsed by, or sponsored by Microsoft. Microsoft product names and Microsoft Learn materials remain the property of their respective owners.
