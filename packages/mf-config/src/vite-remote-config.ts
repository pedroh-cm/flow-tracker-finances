import path from "node:path";
import { fileURLToPath } from "node:url";

import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type UserConfig } from "vite";

import type { RemoteDefinition } from "./index";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(__dirname, "../../..");

type CreateRemoteViteConfigOptions = {
  remote: RemoteDefinition;
  appDir: string;
};

export function createRemoteViteConfig({ remote, appDir }: CreateRemoteViteConfigOptions): UserConfig {
  const exposeName = remote.exposePath.replace("./", "");

  return defineConfig({
    root: appDir,
    plugins: [
      react(),
      federation({
        name: remote.mfName,
        filename: "remoteEntry.js",
        exposes: {
          [remote.exposePath]: "./src/App.tsx",
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: "^19.0.0",
          },
          "react-dom": {
            singleton: true,
            requiredVersion: "^19.0.0",
          },
          zustand: {
            singleton: true,
          },
          "@tanstack/react-query": {
            singleton: true,
          },
        },
      }),
    ],
    server: {
      port: remote.port,
      strictPort: true,
      cors: true,
      origin: remote.defaultUrl,
    },
    preview: {
      port: remote.port,
      strictPort: true,
      cors: true,
    },
    build: {
      outDir: "dist",
      target: "chrome89",
      minify: false,
      cssCodeSplit: false,
      modulePreload: false,
      rollupOptions: {
        output: {
          format: "es",
        },
      },
    },
    resolve: {
      alias: {
        "@": monorepoRoot,
        "@flowtrack/shared": path.resolve(monorepoRoot, "packages/shared/src"),
      },
    },
    css: {
      postcss: path.resolve(monorepoRoot, "postcss.config.mjs"),
    },
    optimizeDeps: {
      include: ["react", "react-dom", "zustand"],
    },
  });
}
