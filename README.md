<h1 align="center">
  💸 FlowTrack Finances
</h1>

<p align="center">
  Gestão financeira pessoal com <strong>Module Federation</strong> — Tech Challenge FIAP Fase 02
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
  <img alt="Module Federation" src="https://img.shields.io/badge/Module_Federation-2.0-646CFF?style=flat-square" />
  <img alt="Docker" src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker" />
  <img alt="Astro" src="https://img.shields.io/badge/Docs-Astro-BC52EE?style=flat-square&logo=astro" />
</p>

---

## Arquitetura Module Federation

```
Shell (Next.js :3000) ──► @module-federation/runtime
        │
        ├── mfe_auth         → :3001/remoteEntry.js
        ├── mfe_dashboard    → :3002/remoteEntry.js
        ├── mfe_transactions → :3003/remoteEntry.js
        └── mfe_investments  → :3004/remoteEntry.js
```

Cada MFE é um **remote Vite** independente, buildado e deployável separadamente.

## Documentação

Site completo em **Astro Starlight**:

```bash
yarn dev:docs    # http://localhost:4321
yarn build:docs  # gera docs/dist/
```

## Começando

```bash
yarn install
cp .env.example .env.local
yarn dev          # Shell + todos os remotes (Module Federation)
```

| Serviço | URL |
|---------|-----|
| Shell | http://localhost:3000 |
| Auth MFE | http://localhost:3001 |
| Dashboard MFE | http://localhost:3002 |
| Transações MFE | http://localhost:3003 |
| Investimentos MFE | http://localhost:3004 |
| Documentação | http://localhost:4321 |

### Modo local (sem remotes)

```bash
yarn dev:local
```

## Estrutura do monorepo

```
flow-track-finances/
├── src/                      # Shell Next.js (host)
├── packages/
│   ├── shared/               # Event bus, registry
│   └── mf-config/            # Config Module Federation
├── remotes/
│   ├── mfe-auth/             # Remote :3001
│   ├── mfe-dashboard/        # Remote :3002
│   ├── mfe-transactions/     # Remote :3003
│   └── mfe-investments/      # Remote :3004
└── docs/                     # Documentação Astro Starlight
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `yarn dev` | Shell + remotes (federation) |
| `yarn dev:local` | Shell sem federation |
| `yarn dev:docs` | Documentação Astro |
| `yarn build` | Build remotes + shell |
| `yarn build:remotes` | Build apenas remotes |
| `yarn test` | Testes Jest |

## Credenciais demo

| E-mail | Senha |
|--------|-------|
| `demo@flowtrack.com` | `demo123456` |
| `admin@flowtrack.com` | `admin123456` |

## Docker

```bash
docker compose up --build
```

## Variáveis de ambiente

```bash
AUTH_SECRET=...
NEXT_PUBLIC_MFE_AUTH_URL=http://localhost:3001
NEXT_PUBLIC_MFE_DASHBOARD_URL=http://localhost:3002
NEXT_PUBLIC_MFE_TRANSACTIONS_URL=http://localhost:3003
NEXT_PUBLIC_MFE_INVESTMENTS_URL=http://localhost:3004
# NEXT_PUBLIC_MFE_MODE=local  # desativa federation
```

## Licença

MIT
