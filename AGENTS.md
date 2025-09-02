# Repository Guidelines

## Project Structure & Module Organization
- Source: `src/` (entry: `src/main.jsx`, app root: `src/App.jsx`, styles: `src/App.css`, assets: `src/assets/`).
- Static assets: `public/` (served at root, e.g., `/vite.svg`).
- HTML shell: `index.html` mounts `#root` and loads `src/main.jsx`.
- Tooling: `vite.config.js` (build/dev), `eslint.config.js` (lint rules). Build output: `dist/`.

## Build, Test, and Development Commands
- `npm run dev`: Start Vite dev server with HMR.
- `npm run build`: Production build to `dist/`.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Run ESLint across the project.

## Coding Style & Naming Conventions
- Language: modern ESM React (`.jsx`). Indent 2 spaces; use semicolons and consistent quotes.
- Components: PascalCase filenames (e.g., `App.jsx`, `UserMenu.jsx`). Non-components may use camelCase.
- Variables/functions: `camelCase`; constants: `UPPER_SNAKE_CASE`.
- Linting: ESLint (recommended JS, React Hooks, React Refresh). Custom rule: `no-unused-vars` ignores `^[A-Z_]`.
- CSS: Keep co-located (e.g., `App.css`) or CSS modules as needed; prefer utility classes over deep nesting.

## Testing Guidelines
- Framework: Vitest + React Testing Library (jsdom env).
- Layout: `src/__tests__/*.test.jsx` or colocate as `ComponentName.test.jsx`.
- Commands: `npm run test` (CI, with coverage), `npm run test:watch` (dev loop).
- Coverage: aim for ≥80% on changed areas; add tests for new UI and hooks.

## Commit & Pull Request Guidelines
- Commit style: Prefer Conventional Commits.
  - Examples: `feat(counter): add step control`, `fix(ui): correct badge color`, `chore(lint): enable react-hooks rules`.
- Scope small and focused; reference issues in the body (e.g., `Closes #12`).
- Pull Requests must include:
  - Clear summary, before/after notes, and screenshots/GIFs for UI.
  - Steps to test locally (`npm run dev`, routes, flags).
  - Any migration or config changes called out explicitly.

## Security & Configuration Tips
- Node 18+ recommended. Do not commit secrets; prefer `.env`/`.env.local` (Vite exposes `VITE_*`).
- Avoid direct DOM access; prefer React state/effects. Validate user input before use.
- Keep `public/` free of sensitive files; everything there is publicly served.
