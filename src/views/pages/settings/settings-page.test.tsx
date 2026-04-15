import { render, screen } from "@testing-library/react";

import { Providers } from "@/src/app/providers";
import { SettingsPage } from "@/src/views/pages/settings/settings-page";

describe("SettingsPage", () => {
  it("renders settings sections and save action", () => {
    render(
      <Providers>
        <SettingsPage />
      </Providers>,
    );

    expect(screen.getByRole("heading", { name: /configurações/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /aparência/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar alterações/i })).toBeInTheDocument();
  });
});
