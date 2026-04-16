import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./input";

describe("Input Component", () => {
  it("renders with placeholder", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("renders different input types", () => {
    const { rerender } = render(<Input type="email" placeholder="email" />);
    expect(screen.getByPlaceholderText("email")).toHaveAttribute("type", "email");

    rerender(<Input type="password" placeholder="password" />);
    expect(screen.getByPlaceholderText("password")).toHaveAttribute("type", "password");

    rerender(<Input type="number" placeholder="number" />);
    expect(screen.getByPlaceholderText("number")).toHaveAttribute("type", "number");
  });

  it("handles default value", () => {
    render(<Input defaultValue="Initial value" />);
    const input = screen.getByDisplayValue("Initial value") as HTMLInputElement;
    expect(input.value).toBe("Initial value");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Input disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText("Disabled") as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it("accepts user input", async () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here") as HTMLInputElement;

    const user = userEvent.setup();
    await user.type(input, "Test input");
    expect(input.value).toBe("Test input");
  });

  it("has correct CSS classes for styling", () => {
    const { container } = render(<Input placeholder="Styled" />);
    const input = container.querySelector("input");
    expect(input).toHaveClass("flex");
    expect(input).toHaveClass("rounded-md");
  });
});
