import type { Metadata } from "next";

import { SettingsPage } from "@/src/views/pages/settings/settings-page";

export const metadata: Metadata = {
  title: "Configurações",
  description: "Gerencie seu perfil, preferências de tema e configurações da sua conta FlowTrack.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SettingsRoutePage() {
  return <SettingsPage />;
}
