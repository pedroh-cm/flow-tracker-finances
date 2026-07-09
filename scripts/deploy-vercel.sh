#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "→ Instalando dependências..."
yarn install

echo "→ Gerando AUTH_SECRET (se não definido)..."
if [ -z "${AUTH_SECRET:-}" ]; then
  AUTH_SECRET="$(openssl rand -base64 32)"
  echo "   AUTH_SECRET gerado. Adicione na Vercel:"
  echo "   $AUTH_SECRET"
fi

echo "→ Build de produção (remotes + shell)..."
yarn build

echo "→ Deploy na Vercel..."
if ! command -v vercel >/dev/null 2>&1; then
  npx vercel@latest deploy --prod
else
  vercel deploy --prod
fi

echo ""
echo "✓ Deploy concluído!"
echo ""
echo "Configure na Vercel (Settings → Environment Variables) se ainda não configurou:"
echo "  AUTH_SECRET=$AUTH_SECRET"
echo ""
echo "As URLs dos MFEs são definidas automaticamente via next.config.ts"
echo "usando VERCEL_PROJECT_PRODUCTION_URL — não é necessário configurar NEXT_PUBLIC_MFE_* manualmente."
