import { fireEvent, render, screen } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import { LoginPage } from "@/src/views/pages/login-page";

const pushMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("shows validation when fields are empty", () => {
    render(
      <Providers>
        <LoginPage />
      </Providers>,
    );

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(screen.getByText(/preencha todos os campos/i)).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
