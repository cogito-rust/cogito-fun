import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { internalIpV4 } from 'internal-ip';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import { resolve } from 'path';

//// @ts-expect-error process is a nodejs global
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

const srcDir = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react(), TanStackRouterVite()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: mobile ? '0.0.0.0' : false,
    hmr: mobile
      ? {
          protocol: 'ws',
          host: await internalIpV4(),
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
  resolve: {
    alias: {
      src: srcDir,
      assets: `${srcDir}/assets`,
      components: `${srcDir}/components`,
      constants: `${srcDir}/constants`,
      features: `${srcDir}/features`,
      hooks: `${srcDir}/hooks`,
      pages: `${srcDir}/pages`,
      routes: `${srcDir}/routes`,
      utils: `${srcDir}/utils`,
    },
  },
}));
