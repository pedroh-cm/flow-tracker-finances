import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Label } from "@/src/views/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/views/components/ui/form";

const meta: Meta<typeof Select> = {
  title: "Components/UI/Form/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Select>;

function SelectDemo() {
  const [value, setValue] = useState("");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-72">
        <SelectValue placeholder="Selecione uma opção" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="deposito">Depósito</SelectItem>
        <SelectItem value="saque">Saque</SelectItem>
        <SelectItem value="transferencia">Transferência</SelectItem>
      </SelectContent>
    </Select>
  );
}

function SelectWithLabel() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <Label htmlFor="category">Categoria</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-72" id="category">
          <SelectValue placeholder="Escolha uma categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alimentacao">Alimentação</SelectItem>
          <SelectItem value="transporte">Transporte</SelectItem>
          <SelectItem value="saude">Saúde</SelectItem>
          <SelectItem value="educacao">Educação</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export const Default: Story = {
  render: () => <SelectDemo />,
};

export const WithLabel: Story = {
  render: () => <SelectWithLabel />,
};
