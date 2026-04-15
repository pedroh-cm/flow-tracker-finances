import { render, screen } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import { LandingPage } from "@/src/views/pages/landing-page";

describe("LandingPage", () => {
  it("renders hero title", () => {
    render(
      <Providers>
        <LandingPage />
      </Providers>,
    );

    expect(screen.getByRole("heading", { name: /suas finanças no/i })).toBeInTheDocument();
  });
});
