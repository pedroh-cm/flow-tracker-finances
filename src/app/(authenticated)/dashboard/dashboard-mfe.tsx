"use client";

import { MfeLoader } from "@/src/microfrontends/shell/mfe-loader";
import { DASHBOARD_MFE } from "@/src/microfrontends/shared/registry";

export function DashboardMfePage() {
  return <MfeLoader manifest={DASHBOARD_MFE} />;
}
