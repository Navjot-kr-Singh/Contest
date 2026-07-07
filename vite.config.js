import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: `${__dirname}index.html`,
        admin: `${__dirname}admin/index.html`,
        login: `${__dirname}admin/login.html`,
      },
    },
  },
});