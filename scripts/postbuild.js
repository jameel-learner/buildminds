import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

console.log('[Post-Build] Configuring Cloudflare Pages / Workers static routes and fallbacks...');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('[Post-Build] Error: dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

// 1. Ensure Cloudflare Pages _redirects file exists in dist
const redirectsPath = path.join(distDir, '_redirects');
const redirectsContent = `# Cloudflare Pages Single Page Application (SPA) rewrite rules
/*    /index.html   200
`;
fs.writeFileSync(redirectsPath, redirectsContent, 'utf8');
console.log('[Post-Build] Created dist/_redirects (Cloudflare Pages SPA rewrite)');

// 2. Ensure dist/404.html is a full clone of index.html for static servers that fall back to 404.html
const dist404Path = path.join(distDir, '404.html');
fs.writeFileSync(dist404Path, indexContent, 'utf8');
console.log('[Post-Build] Created dist/404.html fallback');

// 3. Generate physical route folders with index.html
// This guarantees that direct requests like https://buildminds.co.in/admin/ or /weekly-event
// are served with HTTP 200 immediately, even on static file servers without rewrite support
const routes = [
  'admin',
  'admin/login',
  'login',
  'weekly-event',
  'enrollment',
  'intensive',
  'register',
  'curriculum',
  'mentors',
  'command-center'
];

routes.forEach((route) => {
  const routeFolder = path.join(distDir, route);
  fs.mkdirSync(routeFolder, { recursive: true });
  fs.writeFileSync(path.join(routeFolder, 'index.html'), indexContent, 'utf8');
  console.log(`[Post-Build] Generated static route: dist/${route}/index.html`);
});

console.log('[Post-Build] Finished! All static routes and Cloudflare SPA rewrites are in place.');
