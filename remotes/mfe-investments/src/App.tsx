import { Providers } from "@/src/app/providers";
import { InvestmentsPage } from "@/src/views/pages/investments/investments-page";

/**
 * Investments Module — exposto via Module Federation como `mfe_investments/InvestmentsModule`
 */
export default function InvestmentsModule() {
  return (
    <Providers>
      <InvestmentsPage />
    </Providers>
  );
}
