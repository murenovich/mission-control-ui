# Mission Control UI

A reusable React design library extracted from the Mission Control dashboard so it can be embedded into other projects with 1:1 visual fidelity.

## What This Repo Contains

- reusable route-level screens in `src/lib/screens`
- the shared shell in `src/lib/MissionControlShell.tsx`
- providers in `src/lib/LifeOsProvider.tsx`
- bundled styles in `src/lib/styles.css`
- a demo app you can run locally with Vite for visual review

## Scripts

- `npm run dev` runs the local demo app
- `npm run build:lib` builds the importable library into `dist/lib`
- `npm run build` builds the demo app and the library
- `npm run typecheck` runs TypeScript checks
- `npm run pack:lib` builds the library and creates an installable tarball in `dist/package`

## Local Development

Start the demo app locally with:

```bash
npm run dev
```

The Vite app runs on [http://localhost:5173](http://localhost:5173) by default.

### React Grab In Dev

`react-grab` is enabled only in local development so you can inspect and reference rendered UI without affecting the production build.

- look for the small floating React Grab toolbar in the bottom-right corner
- hover an element and press `Cmd+C` on macOS or `Ctrl+C` on Windows/Linux to copy its context
- use the toolbar to select elements, review capture history, or temporarily disable React Grab

## Install In Another Project

### Option 1: Local file dependency

```json
{
  "dependencies": {
    "mission-control-ui": "file:../mission-control-ui"
  }
}
```

Then run:

```bash
npm install
```

### Option 2: Tarball install

Build a tarball here:

```bash
npm run pack:lib
```

Then install it from the consumer app:

```bash
npm install ../mission-control-ui/dist/package/mission-control-ui-0.0.1.tgz
```

## Basic Usage

```tsx
import { MemoryRouter } from 'react-router';
import {
  LifeOsProvider,
  MissionControlShell,
  NewsfeedScreen,
} from 'mission-control-ui';
import 'mission-control-ui/styles.css';

export function App() {
  return (
    <MemoryRouter>
      <LifeOsProvider>
        <MissionControlShell activeSection="newsfeed" currentPage="newsfeed">
          <NewsfeedScreen />
        </MissionControlShell>
      </LifeOsProvider>
    </MemoryRouter>
  );
}
```

## Entry Points

- `mission-control-ui` exports the stable root library surface and bundled styles integration.
- `mission-control-ui/shell` exports providers, shell utilities, and `MissionControlShell`.
- `mission-control-ui/screens` exports the reusable route-level screens and their types.
- `mission-control-ui/demo` exports demo fixtures for local previews and examples.

## Workflow

This repo now uses a lightweight GitHub and Changesets workflow for cleaner day-to-day collaboration:

- create feature branches from `main`, preferably as `codex/<description>`
- run `npm run ci` before opening a PR
- add a changeset with `npm run changeset` when the published package changes
- rely on the release workflow on `main` to prepare version bumps, tags, and npm releases

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full branch, PR, and release process.

## Major Reusable Screens

- `HealthOverviewScreen`
- `ProjectsOverviewScreen`
- `MessagesScreen`
- `DiscordMessagesScreen`
- `SlackMessagesScreen`
- `TelegramMessagesScreen`
- `NewsfeedScreen`
- `FeedSourcesScreen`
- `SavedArticlesScreen`
- `TrendingScreen`
- `CategoriesScreen`

## Notes

- Consumers should provide `react`, `react-dom`, and `react-router`.
- The library emits `.d.ts` declarations in `dist/lib`.
- The main route-level screens are props-driven and can receive host data while preserving the existing design.
- Some smaller showcase/supporting screens still preserve local demo behavior by design.
