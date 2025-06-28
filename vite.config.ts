import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/coaching-web/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        "404": "404.html",
      },
    },
  },
});
