# AGENTS.md

This repository contains a personal website built with React and Vite.

## Development Commands

- **Start dev server**: `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Deploy to GitHub Pages**: `npm run deploy`
- **Clean build artifacts**: `npm run clean`
- **Lint (TypeScript)**: `npm run lint`

## Project Structure

- **Source code**: Located in the `src/` directory.
- **Components**: React components are in `src/components/`.
- **Content**: Blog posts and other markdown content are handled by a custom browser-safe frontmatter parser and `react-markdown`.
- **Build output**: Generated in the `dist/` directory.

## Key Dependencies & Tools

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages (`gh-pages` package)
- **TypeScript**: Used for type checking (`tsc --noEmit`).

## Conventions & Quirks

- **Monorepo/Packages**: This appears to be a single-package project.
- **Generated Code**: No obvious signs of generated code in the root, but review `vite.config.ts` and `tsconfig.json` if issues arise.
- **Environment Variables**: `dotenv` is listed as a dependency, suggesting environment variables are used. Check `.env` files if needed.
- **Testing**: The `lint` script (`tsc --noEmit`) is the only explicit verification step listed. There are no explicit testing commands like `test` or `jest`. Further investigation into how tests are run would be needed if this were a requirement.

## How to investigate

Read the highest-value sources first:
- `README*`, root manifests (`package.json`), workspace config (`vite.config.ts`, `tsconfig.json`), lockfiles (`package-lock.json`)
- build, test, lint, formatter, typecheck, and codegen config (`vite.config.ts`, `tsconfig.json`, `package.json` scripts)
- CI workflows and pre-commit / task runner config (`.github/workflows/deploy.yml`)
- existing instruction files (`AGENTS.md`, `CLAUDE.md`, `.cursor/rules/`, `.cursorrules`, `.github/copilot-instructions.md`)
- repo-local OpenCode config such as `opencode.json`

If architecture is still unclear after reading config and docs, inspect a small number of representative code files to find the real entrypoints, package boundaries, and execution flow. Prefer reading the files that explain how the system is wired together over random leaf files.

Prefer executable sources of truth over prose. If docs conflict with config or scripts, trust the executable source and only keep what you can verify.

## What to extract

Look for the highest-signal facts for an agent working in this repo:
- exact developer commands, especially non-obvious ones
- how to run a single test, a single package, or a focused verification step
- required command order when it matters, such as `lint -> typecheck -> test`
- monorepo or multi-package boundaries, ownership of major directories, and the real app/library entrypoints
- framework or toolchain quirks: generated code, migrations, codegen, build artifacts, special env loading, dev servers, infra deploy flow
- repo-specific style or workflow conventions that differ from defaults
- testing quirks: fixtures, integration test prerequisites, snapshot workflows, required services, flaky or expensive suites
- important constraints from existing instruction files worth preserving

Good `AGENTS.md` content is usually hard-earned context that took reading multiple files to infer.

## Questions

Only ask the user questions if the repo cannot answer something important. Use the `question` tool for one short batch at most.

Good questions:
- undocumented team conventions
- branch / PR / release expectations
- missing setup or test prerequisites that are known but not written down

Do not ask about anything the repo already makes clear.

## Writing rules

Include only high-signal, repo-specific guidance such as:
- exact commands and shortcuts the agent would otherwise guess wrong
- architecture notes that are not obvious from filenames
- conventions that differ from language or framework defaults
- setup requirements, environment quirks, and operational gotchas
- references to existing instruction sources that matter

Exclude:
- generic software advice
- long tutorials or exhaustive file trees
- obvious language conventions
- speculative claims or anything you could not verify
- content better stored in another file referenced via `opencode.json` `instructions`

When in doubt, omit.

Prefer short sections and bullets. If the repo is simple, keep the file simple. If the repo is large, summarize the few structural facts that actually change how an agent should work.

If `AGENTS.md` already exists at `/home/i2t/Git/njse22.github.io`, improve it in place rather than rewriting blindly. Preserve verified useful guidance, delete fluff or stale claims, and reconcile it with the current codebase.

# Project Overview
This repository hosts a personal website built with React and Vite, styled with Tailwind CSS.

## Structure
*   **Source Code:** All primary logic is in the `src/` directory.
*   **Components:** React components are located in `src/components/`.
*   **Content:** Blog posts and markdown content are processed using a custom browser-safe frontmatter parser and `react-markdown`.
*   **Output:** The production build is generated in the `dist/` directory.

## Tech Stack & Quirks
*   **Framework:** React
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS
*   **Typing:** TypeScript is used (Verification command: `npm run lint`).
*   **Environment:** Uses `dotenv` for environment variables.
*   **Architecture:** This is a single-package project.

## Core Commands
| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the local development server. |
| `npm run build` | Compiles the application for production. |
| `npm run preview` | Previews the production build locally. |
| `npm run deploy` | Deploys the site to GitHub Pages. |
| `npm run clean` | Cleans previous build artifacts. |
| `npm run lint` | Runs TypeScript lint checks (`tsc --noEmit`). |
