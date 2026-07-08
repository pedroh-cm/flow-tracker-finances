import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import { LoginPage } from "@/src/views/pages/login/login-page";

const pushMock = jest.fn();
const refreshMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    pushMock.mockReset();
    refreshMock.mockReset();
  });

  it("shows validation when fields are empty", async () => {
    render(
      <Providers>
        <LoginPage />
      </Providers>,
    );

    const submitButton = await screen.findByRole("button", { name: /^entrar$/i });
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText(/e-mail obrigatório/i)).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("submits credentials and redirects on success", async () => {
    render(
      <Providers>
        <LoginPage />
      </Providers>,
    );

    await act(async () => {
      fireEvent.change(await screen.findByLabelText(/^e-mail$/i), {
        target: { value: "demo@flowtrack.com" },
      });
      fireEvent.change(screen.getByPlaceholderText("••••••••"), {
        target: { value: "demo123456" },
      });
      fireEvent.click(screen.getByRole("button", { name: /^entrar$/i }));
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
