import fs from 'node:fs';
import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig, transformWithOxc } from 'vite';
import { imagetools } from 'vite-imagetools';
import courses from './src/data/courses.js';
import { alternates, languages, localePath } from './src/utils/paths.js';

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
// Every route exists in English and, under /de/, in German: each copy gets
// its language, its title and description from src/locales/<language>.json
// and links to the same page in the other language.
const SITE_URL = 'https://satzbau.example';
function staticRoutes() {
  const routes = ['/courses', '/placement', '/school', '/contact', ...courses.map((c) => `/courses/${c.id}`)];
  const escape = (text) => text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  function page(html, lang, route) {
    const { meta } = JSON.parse(fs.readFileSync(`src/locales/${lang}.json`, 'utf8'));
    const links = route
      ? alternates(route, SITE_URL).map((l) => `<link rel="alternate" hreflang="${l.hreflang}" href="${l.href}" />`)
      : [];
    return html
      .replace('<html lang="en">', `<html lang="${lang}">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${escape(meta.title)}</title>`)
      .replace(/(name="description"\s+content=")[^"]*/, `$1${escape(meta.description)}`)
      .replace(/<noscript>[^<]*<\/noscript>/, `<noscript>${escape(meta.noscript)}</noscript>`)
      .replace('  </head>', `${links.map((l) => `    ${l}\n`).join('')}  </head>`);
  }

  return {
    name: 'static-routes',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve('dist');
      const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
      const urls = [];
      for (const lang of languages) {
        for (const route of ['/', ...routes]) {
          const url = localePath(route, lang);
          fs.mkdirSync(path.join(dist, url), { recursive: true });
          fs.writeFileSync(path.join(dist, url, 'index.html'), page(html, lang, route));
          urls.push(url);
        }
      }
      fs.writeFileSync(path.join(dist, '404.html'), page(html, 'en'));
      const entries = urls.map((r) => `  <url><loc>${SITE_URL}${r}</loc></url>`).join('\n');
      fs.writeFileSync(
        path.join(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`,
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
