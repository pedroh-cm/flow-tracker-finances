import type { NextConfig } from "next";

function getDeploymentBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

const deploymentBaseUrl = getDeploymentBaseUrl();

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@flowtrack/mf-config", "@flowtrack/shared"],
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
  },
  env: {
    NEXT_PUBLIC_APP_URL: deploymentBaseUrl,
    NEXT_PUBLIC_MFE_AUTH_URL: `${deploymentBaseUrl}/mfe-auth`,
    NEXT_PUBLIC_MFE_DASHBOARD_URL: `${deploymentBaseUrl}/mfe-dashboard`,
    NEXT_PUBLIC_MFE_TRANSACTIONS_URL: `${deploymentBaseUrl}/mfe-transactions`,
    NEXT_PUBLIC_MFE_INVESTMENTS_URL: `${deploymentBaseUrl}/mfe-investments`,
  },
};

export default nextConfig;
