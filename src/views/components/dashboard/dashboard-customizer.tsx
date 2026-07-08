"use client";

import { LayoutGrid, RotateCcw } from "lucide-react";

import { DashboardWidgetId, useDashboardStore } from "@/src/viewmodels/stores/dashboard-store";
import { Button } from "@/src/views/components/ui/button";
import { Input } from "@/src/views/components/ui/form";
import { Label } from "@/src/views/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/views/components/ui/feedback/dialog";

export function DashboardCustomizer() {
  const { widgets, toggleWidget, resetWidgets, savingsGoal, spendingLimit, setSavingsGoal, setSpendingLimit } =
    useDashboardStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" aria-label="Personalizar dashboard">
          <LayoutGrid size={16} /> Personalizar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Personalizar Dashboard</DialogTitle>
          <DialogDescription>Escolha quais widgets exibir e configure metas financeiras.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="savings-goal">Meta de economia mensal (R$)</Label>
            <Input
              id="savings-goal"
              type="number"
              min="0"
              value={savingsGoal}
              onChange={(event) => setSavingsGoal(Number(event.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="spending-limit">Limite de gastos mensal (R$)</Label>
            <Input
              id="spending-limit"
              type="number"
              min="0"
              value={spendingLimit}
              onChange={(event) => setSpendingLimit(Number(event.target.value))}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Widgets visíveis</p>
            <ul className="space-y-2">
              {widgets.map((widget) => (
                <li key={widget.id}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 hover:bg-muted/30">
                    <input
                      type="checkbox"
                      checked={widget.visible}
                      onChange={() => toggleWidget(widget.id as DashboardWidgetId)}
                      className="mt-1 h-4 w-4 accent-primary"
                      aria-label={`Exibir ${widget.label}`}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{widget.label}</p>
                      <p className="text-xs text-muted-foreground">{widget.description}</p>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <Button type="button" variant="ghost" size="sm" onClick={resetWidgets} className="gap-2">
            <RotateCcw size={14} /> Restaurar padrão
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
