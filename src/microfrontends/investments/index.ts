/**
 * Investments Microfrontend — módulo independente com API pública.
 * Pode ser carregado via dynamic import (code splitting) ou Module Federation.
 */
export { InvestmentsPage as InvestmentsModule } from "@/src/views/pages/investments/investments-page";
export { INVESTMENTS_MFE } from "@/src/microfrontends/shared/registry";
