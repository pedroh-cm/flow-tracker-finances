import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/src/views/components/ui/button";
import { Toaster } from "@/src/views/components/ui/feedback";
import { useToast } from "@/src/hooks/use-toast";

const meta: Meta = {
  title: "Components/UI/Feedback/Toast",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

function ToastDemo() {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() =>
          toast({
            title: "Sucesso!",
            description: "Sua transação foi adicionada com sucesso.",
          })
        }
      >
        Toast Padrão
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            title: "Erro",
            description: "Ocorreu um erro ao processar sua solicitação.",
            variant: "destructive",
          })
        }
      >
        Toast Erro
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Informação",
            description: "Verifique seus dados antes de continuar.",
          })
        }
      >
        Toast Informação
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};
