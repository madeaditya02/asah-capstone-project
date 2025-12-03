import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// UBAH BARIS INI: dari 'tailwindcss' menjadi '@tailwindcss/postcss'
import tailwindcss from "@tailwindcss/postcss";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
