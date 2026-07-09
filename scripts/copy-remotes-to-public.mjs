import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const remotes = [
  { dir: "mfe-auth", publicPath: "mfe-auth" },
  { dir: "mfe-dashboard", publicPath: "mfe-dashboard" },
  { dir: "mfe-transactions", publicPath: "mfe-transactions" },
  { dir: "mfe-investments", publicPath: "mfe-investments" },
];

function copyDirectory(source, destination) {
  fs.mkdirSync(destination, { recursive: true });

  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
      continue;
    }

    fs.copyFileSync(sourcePath, destinationPath);
  }
}

for (const remote of remotes) {
  const source = path.join(rootDir, "remotes", remote.dir, "dist");
  const destination = path.join(rootDir, "public", remote.publicPath);

  if (!fs.existsSync(source)) {
    throw new Error(`Build do remote não encontrado: ${source}. Execute yarn build:remotes primeiro.`);
  }

  fs.rmSync(destination, { recursive: true, force: true });
  copyDirectory(source, destination);
  console.log(`✓ ${remote.publicPath} → public/${remote.publicPath}`);
}
