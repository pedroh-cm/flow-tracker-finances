import type { Meta, StoryObj } from "@storybook/react";

import { LandingPage } from "@/src/views/pages/landing/landing-page";

const meta: Meta<typeof LandingPage> = {
  title: "Pages/LandingPage",
  component: LandingPage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {};
