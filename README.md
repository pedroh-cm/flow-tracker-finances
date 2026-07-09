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

<p align="center">
  <a href="https://flow-track-finances.vercel.app"><strong>🚀 Aplicação em produção</strong></a>
  &nbsp;·&nbsp;
  <a href="https://docs-nine-ochre.vercel.app"><strong>📚 Documentação</strong></a>
</p>

---

## Links em produção

| Recurso | URL |
|---------|-----|
| **Aplicação** | https://flow-track-finances.vercel.app |
| **Documentação** | https://docs-nine-ochre.vercel.app |

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

| Ambiente | URL |
|----------|-----|
| Produção | [docs-nine-ochre.vercel.app](https://docs-nine-ochre.vercel.app) |
| Local | http://localhost:4321 |

```bash
yarn dev:docs       # desenvolvimento
yarn build:docs     # gera docs/dist/
yarn deploy:docs    # publica na Vercel
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

## Deploy (Vercel)

Deploy unificado: shell + 4 remotes no **mesmo domínio**.

```bash
npx vercel login          # primeira vez
./scripts/deploy-vercel.sh
```

**Variável obrigatória na Vercel:** `AUTH_SECRET` (gere com `openssl rand -base64 32`)

Sem `AUTH_SECRET`, o endpoint `/api/auth/login` retorna **500** em produção.

```bash
# Adicionar via CLI (após vercel login)
printf '%s' 'SEU_SECRET_AQUI' | npx vercel env add AUTH_SECRET production
npx vercel deploy --prod
```

Ou em **Vercel → Project → Settings → Environment Variables**.

| URL produção | Descrição |
|--------------|-----------|
| [flow-track-finances.vercel.app](https://flow-track-finances.vercel.app) | Shell (app principal) |
| `/mfe-auth/remoteEntry.js` | Remote de autenticação |
| `/mfe-dashboard/remoteEntry.js` | Remote do dashboard |
| `/mfe-transactions/remoteEntry.js` | Remote de transações |
| `/mfe-investments/remoteEntry.js` | Remote de investimentos |

**Documentação:** [docs-nine-ochre.vercel.app](https://docs-nine-ochre.vercel.app)

## Credenciais demo

| E-mail | Senha |
|--------|-------|
| `demo@flowtrack.com` | `demo123456` |
| `admin@flowtrack.com` | `admin123456` |

## Docker

```bash
docker compose up --build
```

Acesse via `http://localhost:3000`. As URLs dos remotes usam `localhost` porque o Module Federation carrega os módulos no **browser** do usuário (portas expostas no host).

## Requisitos Tech Challenge Fase 02

| Requisito | Status | Onde ver |
|-----------|--------|----------|
| Gráficos e análises financeiras | ✅ | `/dashboard` |
| Personalização do dashboard (Plus) | ✅ | Botão "Personalizar" no dashboard |
| Filtros avançados e busca | ✅ | `/transactions` |
| Paginação de transações | ✅ | `/transactions` (rodapé da lista) |
| Validação avançada + sugestões de categoria | ✅ | Modal "Nova Transação" |
| Upload de anexos/recibos | ✅ | Modal "Nova Transação" |
| Docker + Docker Compose | ✅ | `docker-compose.yml` |
| Deploy cloud (Vercel) | ✅ | `vercel.json` + [guia de deploy](docs/src/content/docs/guias/deploy.mdx) |
| Autenticação e autorização | ✅ | `/login`, `src/lib/auth/` |
| Microfrontends (Module Federation) | ✅ | `remotes/`, `packages/mf-config/` |
| Gestão de estado complexa | ✅ | Zustand (`src/viewmodels/stores/`) |
| TypeScript | ✅ | Todo o monorepo |
| SSR/SSG | ✅ | Landing page (`src/app/page.tsx` — SSG) |
| Comunicação entre MFEs | ✅ | Event Bus (`packages/shared/src/event-bus.ts`) |
| Acessibilidade | ✅ | Skip link, ARIA, testes `jest-axe` |

### Gestão de estado

O projeto utiliza **Zustand** com middleware de persistência (`localStorage`) para stores de transações, dashboard, autenticação e tema. Atende o requisito de gestão de estado complexa com tipagem TypeScript e atualizações reativas entre componentes.

### Comunicação entre microfrontends

O **Event Bus** (`mfeEventBus`) permite pub/sub entre MFEs:

- `transaction-store` emite eventos ao criar/editar/excluir transações
- `dashboard-page` escuta e sincroniza em tempo real
- `theme-store` emite `theme:changed` ao alternar tema

### Deploy da documentação (Astro)

Projeto Vercel separado na pasta `docs/`:

```bash
yarn deploy:docs
```

| URL | Descrição |
|-----|-----------|
| [docs-nine-ochre.vercel.app](https://docs-nine-ochre.vercel.app) | Documentação em produção |

Ou importe o repositório na Vercel com **Root Directory:** `docs`.

> Adicione aqui o link do vídeo após gravar a demonstração.

Roteiro sugerido: integração Module Federation → dashboard com gráficos → transações com filtros → Docker → deploy Vercel.

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
