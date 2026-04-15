import { render, screen } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import Home from "./page";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    return <img {...props} alt={props.alt ?? ""} />;
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
