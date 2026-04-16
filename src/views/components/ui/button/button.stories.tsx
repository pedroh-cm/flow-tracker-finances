import type { Meta, StoryObj } from "@storybook/react";
import { Download, Plus } from "lucide-react";

import { Button } from "@/src/views/components/ui/button/button";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Salvar",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Cancelar",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Deletar",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline Button",
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    children: "Mais opções",
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    children: "Link Button",
    variant: "link",
  },
};

export const Small: Story = {
  args: {
    children: "Pequeno",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Grande",
    size: "lg",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Download size={16} />
        Exportar
      </>
    ),
    variant: "outline",
  },
};

export const IconOnly: Story = {
  args: {
    children: <Plus size={20} />,
    size: "icon",
  },
};

export const Disabled: Story = {
  args: {
    children: "Desabilitado",
    disabled: true,
  },
};
