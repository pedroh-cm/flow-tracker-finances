import { useMemo, useState } from "react";

type UsePaginationOptions = {
  totalItems: number;
  pageSize?: number;
};

export function usePagination({ totalItems, pageSize = 8 }: UsePaginationOptions) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const safePage = Math.min(page, totalPages);

  const paginatedRange = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return { start, end: start + pageSize };
  }, [safePage, pageSize]);

  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)));
  };

  const resetPage = () => setPage(1);

  return {
    page: safePage,
    pageSize,
    totalPages,
    paginatedRange,
    goToPage,
    resetPage,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}
