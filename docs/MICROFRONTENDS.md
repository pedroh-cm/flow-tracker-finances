# FlowTrack Finances — Module Federation

> Documentação completa disponível em `docs/` (Astro Starlight). Execute `yarn dev:docs` e acesse http://localhost:4321

## Arquitetura

```
Shell (Next.js :3000)
    │
    ├── @module-federation/runtime
    │
    ├── mfe_auth         → :3001/remoteEntry.js
    ├── mfe_dashboard    → :3002/remoteEntry.js
    ├── mfe_transactions → :3003/remoteEntry.js
    └── mfe_investments  → :3004/remoteEntry.js
```

## Monorepo

| Pacote | Descrição |
|--------|-----------|
| `@flowtrack/mf-config` | Config central de remotes, portas, factory Vite |
| `@flowtrack/shared` | Event bus, registry de MFEs |
| `@flowtrack/mfe-*` | Remotes Vite com Module Federation |
| `@flowtrack/docs` | Site de documentação Astro |

## Comandos

```bash
yarn dev          # Shell + todos os remotes
yarn dev:local    # Shell sem federation (dynamic imports)
yarn dev:docs     # Documentação Astro
yarn build        # Remotes + Shell
```

## Modos

- **Federation** (padrão): remotes carregados via `remoteEntry.js`
- **Local**: `NEXT_PUBLIC_MFE_MODE=local` — dynamic imports do monorepo

Veja a documentação completa em `yarn dev:docs`.
