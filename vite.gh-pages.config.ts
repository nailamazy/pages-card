
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const basePath = process.env.VITE_BASE_PATH ?? (repoName ? `/${repoName}/` : "/");

export default defineConfig({
  plugins: [react(), runtimeErrorOverlay()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: path.resolve(__dirname, "client"),
  base: basePath,
  define: {
    // Disable API calls for static hosting
    "import.meta.env.VITE_API_ENABLED": "false",
  },
  build: {
    outDir: path.resolve(__dirname, "docs"),
    emptyOutDir: true,
  },
});
