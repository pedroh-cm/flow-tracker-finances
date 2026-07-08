import { TransactionCategory } from "@/src/models/entities/transaction";

const keywordMap: Record<TransactionCategory, string[]> = {
  salary: ["salário", "salario", "freelance", "pagamento", "prolabore", "13º", "bonus", "bônus", "cashback"],
  food: ["supermercado", "mercado", "ifood", "restaurante", "lanche", "padaria", "açougue", "alimentação", "alimentacao", "café", "cafe"],
  transport: ["uber", "99", "gasolina", "combustível", "combustivel", "estacionamento", "ônibus", "onibus", "metrô", "metro", "taxi", "táxi"],
  entertainment: ["netflix", "spotify", "cinema", "streaming", "jogo", "game", "show", "ingresso", "disney", "hbo"],
  bills: ["aluguel", "luz", "água", "agua", "internet", "telefone", "condomínio", "condominio", "energia", "conta"],
  health: ["farmácia", "farmacia", "médico", "medico", "hospital", "plano de saúde", "dentista", "remédio", "remedio"],
  education: ["curso", "udemy", "faculdade", "escola", "livro", "matrícula", "matricula", "mensalidade"],
  shopping: ["loja", "shopping", "amazon", "mercado livre", "roupa", "eletrônico", "eletronico", "compra"],
  other: [],
};

export function suggestCategory(description: string): TransactionCategory | null {
  const normalized = description.toLowerCase().trim();
  if (!normalized) return null;

  for (const [category, keywords] of Object.entries(keywordMap) as [TransactionCategory, string[]][]) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return category;
    }
  }

  return null;
}

export function getCategorySuggestions(description: string): TransactionCategory[] {
  const normalized = description.toLowerCase().trim();
  if (!normalized) return [];

  const matches: TransactionCategory[] = [];

  for (const [category, keywords] of Object.entries(keywordMap) as [TransactionCategory, string[]][]) {
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      matches.push(category);
    }
  }

  return matches.length > 0 ? matches : (["other"] as TransactionCategory[]);
}
