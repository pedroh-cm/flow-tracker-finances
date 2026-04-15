import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "@/src/views/components/ui/form";

const meta: Meta<typeof Label> = {
  title: "Components/UI/Form/Label",
  component: Label,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "Nome completo",
    htmlFor: "name",
  },
};

export const Required: Story = {
  args: {
    children: "E-mail *",
    htmlFor: "email",
  },
};

export const Disabled: Story = {
  args: {
    children: "Campo desabilitado",
    htmlFor: "disabled",
  },
  render: (args) => <Label {...args} className="text-muted-foreground cursor-not-allowed" />,
};

export const WithDescription: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="password">Senha</Label>
      <p className="text-xs text-muted-foreground">Mínimo 8 caracteres</p>
    </div>
  ),
};
