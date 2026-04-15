<h1 align="center">
  💸 FlowTrack Finances
</h1>

<p align="center">
  Aplicação moderna de gestão financeira pessoal — gerencie transações, acompanhe investimentos e tome decisões inteligentes com uma interface elegante e responsiva.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss" />
  <img alt="Zustand" src="https://img.shields.io/badge/Zustand-5-orange?style=flat-square" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green?style=flat-square" />
</p>

---

## ✨ Funcionalidades

- **Dashboard** — Visão geral do saldo, receitas e despesas com cards e gráficos
- **Transações** — Criação, edição e exclusão de transações com filtros por tipo e busca por descrição
- **Investimentos** — Acompanhamento de carteira de ativos
- **Configurações** — Gerenciamento de perfil e preferência de tema (claro/escuro)
- **Autenticação** — Fluxo de login com persistência de sessão
- **Tema** — Alternância entre modo claro e escuro com persistência via localStorage
- **Responsivo** — Interface adaptada para desktop e mobile

---

## 🛠 Stack

| Camada | Tecnologias |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org) com App Router |
| **UI** | [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com), [Radix UI](https://radix-ui.com) |
| **Estado** | [Zustand 5](https://zustand-demo.pmnd.rs) com `persist` (localStorage) |
| **Formulários** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Ícones** | [Lucide React](https://lucide.dev) |
| **Testes** | [Jest](https://jestjs.io) + [Testing Library](https://testing-library.com) |
| **Storybook** | [Storybook 8](https://storybook.js.org) |

---

## 🗂 Estrutura do Projeto

```
src/
├── app/                        # Rotas Next.js (App Router)
│   ├── (authenticated)/        # Rotas protegidas (dashboard, transações, etc.)
│   └── login/
├── hooks/                      # Hooks globais (use-toast)
├── lib/                        # Utilitários (cn, etc.)
├── models/
│   ├── entities/               # Tipos e entidades de domínio
│   ├── repositories/           # Interfaces de repositório
│   └── services/               # Implementações (local, memory)
├── types/                      # Declarações de tipos globais
├── viewmodels/
│   ├── stores/                 # Stores Zustand (auth, theme, transactions)
│   └── use-cases/              # Lógica de negócio
└── views/
    ├── components/
    │   ├── transactions/       # Componentes de transações
    │   └── ui/                 # Design system
    │       ├── button/
    │       ├── feedback/       # Dialog, Toast, Toaster
    │       ├── form/           # Input, Label, Select
    │       └── navigation/     # DropdownMenu, Tabs
    ├── layouts/                # Layouts reutilizáveis
    └── pages/                  # Páginas da aplicação
        ├── dashboard/
        ├── investments/
        ├── landing/
        ├── login/
        ├── not-found/
        ├── settings/
        └── transactions/
```

---

## 🚀 Rodando Localmente

### Pré-requisitos

- Node.js 18+
- Yarn 1.22+

### Instalação

```bash
# Clone o repositório
git clone https://github.com/pedroh-cm/flow-tracker-finances.git
cd flow-tracker-finances

# Instale as dependências
yarn install

# Inicie o servidor de desenvolvimento
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

**Credenciais de acesso (demo):**
> Use qualquer e-mail válido com senha de 6+ caracteres para fazer login.

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `yarn dev` | Inicia o servidor de desenvolvimento |
| `yarn build` | Gera o build de produção |
| `yarn start` | Inicia o servidor de produção |
| `yarn lint` | Executa o ESLint |
| `yarn test` | Executa os testes unitários |
| `yarn test:watch` | Executa os testes em modo watch |
| `yarn test:coverage` | Gera relatório de cobertura |
| `yarn storybook` | Inicia o Storybook na porta 6006 |
| `yarn build-storybook` | Gera o build estático do Storybook |

---

## 🧪 Testes

Os testes utilizam **Jest** e **Testing Library**. Cada página possui seu próprio arquivo de teste co-localizado.

```bash
# Rodar todos os testes
yarn test

# Modo watch (re-executa ao salvar)
yarn test:watch

# Relatório de cobertura
yarn test:coverage
```

---

## 📚 Storybook

O projeto possui documentação visual de todos os componentes do design system.

```bash
yarn storybook
```

Acesse [http://localhost:6006](http://localhost:6006). Os componentes estão organizados em:

- `Components/UI/Button`
- `Components/UI/Form` — Input, Label, Select
- `Components/UI/Feedback` — Dialog, Toast
- `Components/UI/Navigation` — DropdownMenu, Tabs

---

## 🏗 Arquitetura

O projeto segue uma arquitetura em camadas inspirada em **Clean Architecture** e **MVVM**:

```
Entities → Repositories (interfaces) → Services (implementações)
       ↓
  Use Cases → Stores (Zustand) → ViewModels
       ↓
     Views (Pages + Components)
```

- **Persistência de estado** via `zustand/persist` com localStorage (chaves: `flowtrack-auth`, `flowtrack-theme`, `flowtrack-transactions`)
- **Proteção de rotas** via `hasHydrated` flag no auth store, evitando redirect prematuro no SSR
- **Hydration segura** — componentes dependentes de tema aguardam `hasHydrated` antes de renderizar ícones/textos condicionais

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
