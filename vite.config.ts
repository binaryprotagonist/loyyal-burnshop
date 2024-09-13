import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src/") },
      { find: "components", replacement: path.resolve(__dirname, "./src/components/") },
      { find: "layouts", replacement: path.resolve(__dirname, "./src/layouts/") },
      { find: "pages", replacement: path.resolve(__dirname, "./src/pages/") },
      { find: "services", replacement: path.resolve(__dirname, "./src/services/") },
      { find: "routes", replacement: path.resolve(__dirname, "./src/routes/") }
    ]
  },
  // server: {
  //   port: 80
  // }
  server: {
    port: 3000
  }
});
