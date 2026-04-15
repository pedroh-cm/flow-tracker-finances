import { render, screen } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import { TransactionsPage } from "@/src/views/pages/transactions/transactions-page";

describe("TransactionsPage", () => {
  it("renders transactions list, search field and action button", () => {
    render(
      <Providers>
        <TransactionsPage />
      </Providers>,
    );

    expect(screen.getByRole("heading", { name: /transações/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/buscar transação/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nova transação/i })).toBeInTheDocument();
    expect(screen.getByText(/salário mensal/i)).toBeInTheDocument();
  });
});
