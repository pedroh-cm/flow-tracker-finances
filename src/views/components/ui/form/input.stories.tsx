import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/src/views/components/ui/form";

const meta: Meta<typeof Input> = {
  title: "Components/UI/Form/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Digite aqui...",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "seu@email.com",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Sua senha",
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Digite um número",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Campo desabilitado",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Texto pré-preenchido",
  },
};
