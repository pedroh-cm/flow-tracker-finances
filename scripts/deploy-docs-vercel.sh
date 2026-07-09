#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOCS_DIR="$ROOT_DIR/docs"

echo "→ Instalando dependências da docs..."
cd "$DOCS_DIR"
yarn install

echo "→ Build da documentação Astro..."
yarn build

echo "→ Deploy na Vercel (projeto docs)..."
if ! command -v vercel >/dev/null 2>&1; then
  npx vercel@latest deploy --prod
else
  vercel deploy --prod
fi

echo ""
echo "✓ Documentação publicada!"
echo "  URL: https://docs-nine-ochre.vercel.app"
