import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/views/components/ui/navigation";

const meta: Meta<typeof Tabs> = {
  title: "Components/UI/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

function TabsDemo() {
  return (
    <Tabs defaultValue="receitas" className="w-full max-w-lg">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="receitas">Receitas</TabsTrigger>
        <TabsTrigger value="despesas">Despesas</TabsTrigger>
      </TabsList>
      <TabsContent value="receitas" className="space-y-4">
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold">Salário</h3>
          <p className="text-sm text-muted-foreground">+R$ 5.000,00</p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold">Freelance</h3>
          <p className="text-sm text-muted-foreground">+R$ 1.500,00</p>
        </div>
      </TabsContent>
      <TabsContent value="despesas" className="space-y-4">
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold">Aluguel</h3>
          <p className="text-sm text-muted-foreground">-R$ 2.000,00</p>
        </div>
        <div className="rounded-lg border border-border p-4">
          <h3 className="font-semibold">Alimentação</h3>
          <p className="text-sm text-muted-foreground">-R$ 800,00</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function TabsThreeDemo() {
  return (
    <Tabs defaultValue="pendentes" className="w-full max-w-lg">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
        <TabsTrigger value="concluidas">Concluídas</TabsTrigger>
        <TabsTrigger value="arquivadas">Arquivadas</TabsTrigger>
      </TabsList>
      <TabsContent value="pendentes">
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Nenhuma transação pendente</p>
        </div>
      </TabsContent>
      <TabsContent value="concluidas">
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Todas as transações estão concluídas</p>
        </div>
      </TabsContent>
      <TabsContent value="arquivadas">
        <div className="rounded-lg border border-border p-4">
          <p className="text-sm text-muted-foreground">Nenhuma transação arquivada</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}

export const Default: Story = {
  render: () => <TabsDemo />,
};

export const ThreeTabs: Story = {
  render: () => <TabsThreeDemo />,
};
