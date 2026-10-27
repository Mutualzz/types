<div align="center">

# Mutualzz is developed at [git.mutualzz.com](https://git.mutualzz.com/mutualzz/types)

**GitHub is a read-only mirror. Issues and pull requests opened on GitHub are not monitored.**

Sign in with your GitHub account. No new password needed.

</div>

# `Mutualzz Types`

Shared TypeScript types and enums for Mutualzz — used by the desktop app, mobile app, server, and voice services so API / gateway contracts stay in sync.

## What’s in here

| Area         | Contents                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------- |
| **Common**   | Core enums and aliases (`ChannelType`, `MessageType`, `InviteType`, relationships, embeds, …) |
| **API**      | REST / domain payload shapes                                                                  |
| **Gateway**  | Gateway dispatch event names and payloads                                                     |
| **REST**     | REST route-oriented types                                                                     |
| **Presence** | Presence / status types                                                                       |
| **Voice**    | Voice opcodes, credentials, and related types                                                 |

Import from the package root:

```ts
import { ChannelType, GatewayDispatchEvents } from "@mutualzz/types";
```

## Development

From the monorepo root:

```bash
pnpm --filter @mutualzz/types build
pnpm --filter @mutualzz/types dev
pnpm --filter @mutualzz/types typecheck
```

When you change a type that other apps depend on, rebuild this package (or run the monorepo `build:packages` script) so consumers pick up the new declarations.

## Authors & credit

Community contributors are credited via git authorship, PR attribution, and changelogs (see [`CONTRIBUTING.md`](https://git.mutualzz.com/mutualzz/types/src/branch/master/CONTRIBUTING.md)).

## License & contributions

Source is available for transparency and community contributions. Contributors get credit for merged work.

- [`LICENSE`](https://git.mutualzz.com/mutualzz/types/src/branch/master/LICENSE) — no unofficial redistribution / competing hosted services without permission
- [`CONTRIBUTING.md`](https://git.mutualzz.com/mutualzz/types/src/branch/master/CONTRIBUTING.md) — how to fork, open PRs, and how credit works
