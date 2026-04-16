import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/UI/Form/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "date"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Digite aqui...",
    type: "text",
    disabled: false,
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "seu@email.com",
    disabled: false,
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Sua senha",
    disabled: false,
  },
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Digite um número",
    disabled: false,
  },
};

export const Phone: Story = {
  args: {
    type: "tel",
    placeholder: "(11) 99999-9999",
    disabled: false,
  },
};

export const Date: Story = {
  args: {
    type: "date",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Campo desabilitado",
    type: "text",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Input com valor",
    type: "text",
    defaultValue: "Valor preenchido",
    disabled: false,
  },
};
