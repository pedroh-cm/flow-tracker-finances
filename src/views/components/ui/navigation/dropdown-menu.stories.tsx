import type { Meta, StoryObj } from "@storybook/react";
import { Check, LogOut, Settings } from "lucide-react";

import { Button } from "@/src/views/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/views/components/ui/navigation";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/UI/Navigation/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Opções</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configurações</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DropdownMenuWithCheckmark() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Filtrar</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Tipo de Transação</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Check className="mr-2 h-4 w-4" />
          <span>Depósito</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Saque</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span>Transferência</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const Default: Story = {
  render: () => <DropdownMenuDemo />,
};

export const WithCheckmark: Story = {
  render: () => <DropdownMenuWithCheckmark />,
};
