"use client";

import { MfeLoader } from "@/src/microfrontends/shell/mfe-loader";
import { AUTH_MFE } from "@/src/microfrontends/shared/registry";

export function LoginMfePage() {
  return <MfeLoader manifest={AUTH_MFE} />;
}
