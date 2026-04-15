import type { Meta, StoryObj } from "@storybook/react";

import { DashboardPage } from "@/src/views/pages/dashboard/dashboard-page";

const meta: Meta<typeof DashboardPage> = {
  title: "Pages/DashboardPage",
  component: DashboardPage,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DashboardPage>;

export const Default: Story = {};
