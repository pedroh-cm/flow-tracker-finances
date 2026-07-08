"use client";

import { MfeLoader } from "@/src/microfrontends/shell/mfe-loader";
import { INVESTMENTS_MFE } from "@/src/microfrontends/shared/registry";

export function InvestmentsMfePage() {
  return <MfeLoader manifest={INVESTMENTS_MFE} />;
}
