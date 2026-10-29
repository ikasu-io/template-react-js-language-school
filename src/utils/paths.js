// Every page exists twice: in English at /… and in German at /de/….
// English is the default and has no prefix.
export const languages = ['en', 'de'];

// '/de/courses' → { lang: 'de', path: '/courses' }; '/courses' → { lang: 'en', … }
export function splitPath(pathname) {
  const match = pathname.match(/^\/de(\/.*)?$/);
  return match ? { lang: 'de', path: match[1] || '/' } : { lang: 'en', path: pathname };
}

// '/courses' in German → '/de/courses'
export function localePath(path, lang) {
  return lang === 'en' ? path : `/${lang}${path}`;
}

// The same page in every language, for <link rel="alternate" hreflang>.
export function alternates(pathname, siteUrl) {
  const path = splitPath(pathname).path.replace(/(.)\/$/, '$1');
  const links = languages.map((lang) => ({ hreflang: lang, href: siteUrl + localePath(path, lang) }));
  return [...links, { hreflang: 'x-default', href: links[0].href }];
}
