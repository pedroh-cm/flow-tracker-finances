import { render, screen } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import { InvestmentsPage } from "@/src/views/pages/investments/investments-page";

describe("InvestmentsPage", () => {
  it("renders investment summary and list", () => {
    render(
      <Providers>
        <InvestmentsPage />
      </Providers>,
    );

    expect(screen.getByRole("heading", { name: /investimentos/i })).toBeInTheDocument();
    expect(screen.getByText(/patrimônio investido/i)).toBeInTheDocument();
    expect(screen.getByText(/tesouro selic 2029/i)).toBeInTheDocument();
  });
});
