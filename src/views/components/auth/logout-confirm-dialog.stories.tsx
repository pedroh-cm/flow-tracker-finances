import type { Meta, StoryObj } from "@storybook/react";
import { LogoutConfirmDialog } from "./logout-confirm-dialog";
import { useState } from "react";
import { Button } from "@/src/views/components/ui/button";

const meta = {
  title: "Components/Auth/LogoutConfirmDialog",
  component: LogoutConfirmDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LogoutConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

function DialogWrapper() {
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full space-y-4">
      <LogoutConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          alert("Usuário desconectado!");
          setOpen(false);
        }}
      />
      {!open && (
        <Button onClick={() => setOpen(true)} variant="outline">
          Abrir Diálogo Novamente
        </Button>
      )}
    </div>
  );
}

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    onConfirm: () => {
      alert("Logout confirmado!");
    },
  },
  render: () => <DialogWrapper />,
};

export const WithCustomText: Story = {
  args: {
    open: true,
    onOpenChange: () => {},
    onConfirm: () => {
      alert("Logout confirmado!");
    },
  },
  render: (args) => (
    <div className="w-full">
      <LogoutConfirmDialog {...args} />
      <p className="mt-4 text-sm text-muted-foreground">
        Diálogo de confirmação de logout aberto
      </p>
    </div>
  ),
};
