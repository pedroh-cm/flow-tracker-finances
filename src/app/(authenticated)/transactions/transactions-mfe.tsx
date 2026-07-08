"use client";

import { MfeLoader } from "@/src/microfrontends/shell/mfe-loader";
import { TRANSACTIONS_MFE } from "@/src/microfrontends/shared/registry";

export function TransactionsMfePage() {
  return <MfeLoader manifest={TRANSACTIONS_MFE} />;
}
