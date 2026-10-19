import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, transformWithOxc } from 'vite';
import { imagetools } from 'vite-imagetools';
import courses from './src/data/courses.js';

// This app started with Create React App, where components are JSX in .js
// files. Vite reads JSX only in .jsx files, so .js files under src/ are
// turned from JSX into plain JavaScript first.
function jsxInJs() {
  return {
    name: 'jsx-in-js',
    enforce: 'pre',
    async transform(code, id) {
      if (!/\/src\/.*\.js$/.test(id)) return null;
      return transformWithOxc(code, id, { lang: 'jsx', jsx: { runtime: 'automatic' } });
    },
  };
}

// The site is one page that routes in the browser. A static host only knows
// files, so every route gets a copy of index.html in its own folder (and
// 404.html for everything else); the browser then shows the right page.
const SITE_URL = 'https://satzbau.example';
function staticRoutes() {
  const routes = ['/courses', '/placement', '/school', '/contact', ...courses.map((c) => `/courses/${c.id}`)];
  return {
    name: 'static-routes',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist');
      const html = fs.readFileSync(path.join(dist, 'index.html'));
      for (const route of routes) {
        fs.mkdirSync(path.join(dist, route), { recursive: true });
        fs.writeFileSync(path.join(dist, route, 'index.html'), html);
      }
      fs.writeFileSync(path.join(dist, '404.html'), html);
      const urls = ['/', ...routes].map((r) => `  <url><loc>${SITE_URL}${r}</loc></url>`).join('\n');
      fs.writeFileSync(
        path.join(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      );
    },
  };
}

export default defineConfig({
  plugins: [
    jsxInJs(),
    react(),
    // `import photo from './x.jpg?photo'` turns a photo into WebP files in
    // four widths and gives back { src, srcset, w, h } for <img>.
    imagetools({
      defaultDirectives: (url) =>
        url.searchParams.has('photo')
          ? new URLSearchParams({ w: '480;800;1200;1600', format: 'webp', quality: '70', as: 'img' })
          : new URLSearchParams(),
    }),
    staticRoutes(),
  ],
});
