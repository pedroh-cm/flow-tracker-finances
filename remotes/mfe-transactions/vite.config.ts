import path from "node:path";
import { fileURLToPath } from "node:url";

import { REMOTES } from "@flowtrack/mf-config";
import { createRemoteViteConfig } from "@flowtrack/mf-config/vite-remote-config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default createRemoteViteConfig({
  remote: REMOTES.transactions,
  appDir: __dirname,
});
