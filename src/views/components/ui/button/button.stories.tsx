import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/src/views/components/ui/button/button";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Salvar",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Cancelar",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Começar Agora",
  },
};
