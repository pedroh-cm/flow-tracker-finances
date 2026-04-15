import { render, screen } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import Home from "./page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { alt?: string }) => {
    return <span aria-label={props.alt ?? "image"} data-testid="next-image" />;
  },
}));

describe("Home page", () => {
  it("renders the main heading", () => {
    render(
      <Providers>
        <Home />
      </Providers>,
    );

    expect(screen.getByRole("heading", { name: /suas finanças no/i })).toBeInTheDocument();
  });
});
