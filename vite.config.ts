import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function cloudflareSpaPlugin(): Plugin {
  return {
    name: 'cloudflare-spa-plugin',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexHtmlPath)) return;

      const htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

      // 1. Ensure dist/_redirects for Cloudflare Pages SPA rewrite
      const redirectsPath = path.join(distDir, '_redirects');
      fs.writeFileSync(redirectsPath, '/*    /index.html   200\n', 'utf8');

      // 2. Ensure dist/404.html fallback
      const dist404Path = path.join(distDir, '404.html');
      fs.writeFileSync(dist404Path, htmlContent, 'utf8');

      // 3. Generate static route directories & .html files
      // This ensures direct hits to /admin, /admin/, /weekly-event, etc. never 404
      const routes = [
        'admin',
        'admin/login',
        'login',
        'weekly-event',
        'enrollment',
        'step-by-step',
        'intensive',
        'register',
        'curriculum',
        'mentors',
        'command-center'
      ];

      routes.forEach((route) => {
        // Generate /route/index.html (for URLs with or without trailing slash)
        const routeDir = path.join(distDir, route);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, 'index.html'), htmlContent, 'utf8');

        // Generate /route.html (for Cloudflare Pages Clean URLs feature)
        if (!route.includes('/')) {
          fs.writeFileSync(path.join(distDir, `${route}.html`), htmlContent, 'utf8');
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cloudflareSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
