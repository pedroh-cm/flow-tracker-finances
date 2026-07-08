"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/src/views/components/ui/button";

type TransactionPaginationProps = {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
};

export function TransactionPagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  hasNext,
  hasPrev,
}: TransactionPaginationProps) {
  if (totalItems <= pageSize) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <nav
      className="flex flex-col items-center justify-between gap-3 sm:flex-row"
      aria-label="Paginação de transações"
    >
      <p className="text-sm text-muted-foreground">
        Exibindo {start}–{end} de {totalItems} transações
      </p>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev}
          aria-label="Página anterior"
        >
          <ChevronLeft size={16} />
        </Button>

        <span className="min-w-[80px] text-center text-sm text-foreground" aria-live="polite">
          Página {page} de {totalPages}
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          aria-label="Próxima página"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </nav>
  );
}
