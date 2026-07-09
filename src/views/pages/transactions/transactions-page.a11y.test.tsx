import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import { TransactionsPage } from "@/src/views/pages/transactions/transactions-page";

expect.extend(toHaveNoViolations);

describe("TransactionsPage accessibility", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(
      <Providers>
        <TransactionsPage />
      </Providers>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
