import { render, screen } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import { DashboardPage } from "@/src/views/pages/dashboard/dashboard-page";

describe("DashboardPage", () => {
  it("renders dashboard sections and action button", () => {
    render(
      <Providers>
        <DashboardPage />
      </Providers>,
    );

    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /nova transação/i })).toBeInTheDocument();
    expect(screen.getByText(/saldo total/i)).toBeInTheDocument();
    expect(screen.getByText(/^receitas$/i)).toBeInTheDocument();
    expect(screen.getByText(/^despesas$/i)).toBeInTheDocument();
  });
});
