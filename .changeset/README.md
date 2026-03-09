# Changesets

This repo uses Changesets to manage version bumps and release notes for `mission-control-ui`.

## When to add a changeset

Add a changeset for any pull request that changes the published package in a way consumers would care about, including:

- new components, screens, or exports
- bug fixes in the published library
- styling or behavior changes that affect consumers
- dependency or packaging changes that alter the shipped artifact

You usually do not need a changeset for:

- CI or GitHub workflow changes
- demo-only content that is not part of the public library surface
- README-only updates

## Common flow

```bash
npm run changeset
```

Choose the appropriate bump:

- `patch` for fixes and backward-compatible polish
- `minor` for backward-compatible additions
- `major` for breaking changes
