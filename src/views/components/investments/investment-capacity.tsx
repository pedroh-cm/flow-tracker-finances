"use client";

type InvestmentCapacityProps = {
  totalInvested: number;
  monthlyIncome: number;
  totalBalance: number;
};

export function InvestmentCapacity({
  totalInvested,
  monthlyIncome,
  totalBalance,
}: InvestmentCapacityProps) {
  // Capacidade sugerida: até 30% da renda mensal para investimento
  const suggestedMonthlyInvestment = monthlyIncome * 0.3;

  // Disponível para investir: saldo - investimentos
  const availableToInvest = Math.max(0, totalBalance - totalInvested);

  // Percentual de saldo investido
  const investmentPercentage = totalBalance > 0 ? (totalInvested / totalBalance) * 100 : 0;

  // Capacidade de aumento: quanto ainda pode investir em relação à renda
  const investmentCapacityPercentage = monthlyIncome > 0 
    ? Math.min(100, (suggestedMonthlyInvestment / monthlyIncome) * 100) 
    : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Disponível para Investir */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Disponível para Investir
          </p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {availableToInvest.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Saldo Total</span>
              <span className="text-foreground">
                {totalBalance.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-primary transition-all duration-700"
                style={{ width: `${Math.min(100, investmentPercentage)}%` }}
              />
            </div>
            <p className="text-right text-xs text-muted-foreground">
              {investmentPercentage.toFixed(1)}% investido
            </p>
          </div>
        </div>

        {/* Recomendação Mensal */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Investimento Recomendado
          </p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {suggestedMonthlyInvestment.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">30% da Renda Mensal</span>
              <span className="text-foreground">
                {monthlyIncome.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-success transition-all duration-700"
                style={{ width: `${investmentCapacityPercentage}%` }}
              />
            </div>
            <p className="text-right text-xs text-muted-foreground">
              Por mês para atingir meta
            </p>
          </div>
        </div>
      </div>

      {/* Conselho */}
      <div className="rounded-2xl border border-border/60 bg-primary/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">💡 Dica</p>
        <p className="mt-2 text-sm text-foreground">
          {availableToInvest > suggestedMonthlyInvestment
            ? `Você tem ${availableToInvest.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })} disponível para investir. Considere aumentar seus investimentos mensais.`
            : `Você está no caminho certo! Continue investindo ${suggestedMonthlyInvestment.toLocaleString(
                "pt-BR",
                {
                  style: "currency",
                  currency: "BRL",
                },
              )} por mês.`}
        </p>
      </div>
    </div>
  );
}
