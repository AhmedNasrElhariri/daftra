import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});

// this is the config when build at laravel
// export default defineConfig({
//   base: '/react/',  // <-- important! This tells Vite to prefix all asset URLs with /react/
//   plugins: [react(), laravel()],
// });
