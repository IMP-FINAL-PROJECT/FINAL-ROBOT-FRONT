import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import million from "million/compiler";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  plugins: [million.vite({ auto: true }), react(), svgr()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
  assetsInclude: ["**/*.jpg"],
});
