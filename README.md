# `@mutualzz/types`

Shared TypeScript types and enums for Mutualzz — used by the desktop app, mobile app, server, and voice services so API / gateway contracts stay in sync.

## What’s in here

| Area | Contents |
|---|---|
| **Common** | Core enums and aliases (`ChannelType`, `MessageType`, `InviteType`, relationships, embeds, …) |
| **API** | REST / domain payload shapes |
| **Gateway** | Gateway dispatch event names and payloads |
| **REST** | REST route-oriented types |
| **Presence** | Presence / status types |
| **Voice** | Voice opcodes, credentials, and related types |

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

Community contributors are credited via git authorship, PR attribution, and changelogs (see [`CONTRIBUTING.md`](./CONTRIBUTING.md)).

## License & contributions

Source is available for transparency and community contributions. Contributors get credit for merged work.

- [`LICENSE`](./LICENSE) — no unofficial redistribution / competing hosted services without permission
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — how to fork, open PRs, and how credit works
