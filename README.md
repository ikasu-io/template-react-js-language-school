# Satzbau — a language school website built with React

> **Satzbau is a fictional language school.** The city of Saalbrück, the
> teachers, the students and the photos are all made up. The site, its
> content and its images were generated with AI, and it is maintained with
> [Ikasu](https://ikasu.io), an AI content copilot for static sites.
> Use it as a starting point for your own school, course provider or studio.

A website for a small German school: courses by level and format, a page
per course, a ten-question placement quiz, the teachers, prices and FAQ.

Built the way many React sites still are: it started as a
[Create React App](https://create-react-app.dev) project and moved to
[Vite](https://vite.dev), keeping its components as JSX in `.js` files,
one plain CSS file next to each component, and `react-router-dom` for the
pages.

- React 19, React Router 7, Vite 8 — no TypeScript, no CSS framework
- Photos resized and converted to WebP at build time (`vite-imagetools`)
- Every page gets its own `index.html` at build time, so links to
  `/courses/…` work on any static host
- The placement quiz runs entirely in the browser; nothing is sent anywhere
- In English and German with [react-i18next](https://react.i18next.com):
  English at `/…`, German at `/de/…`

## Getting started

Needs Node.js 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
npm run preview  # serve dist/ locally
```

## Where to change what

| To change … | Edit |
|---|---|
| A course: dates, times, price, places left | `src/data/courses.js` — one object per course |
| A course's title, days and what you learn | `src/content/en/courses.json` and `src/content/de/courses.json`, under the course's id |
| Add a course | a new object in `src/data/courses.js` and its texts in both `courses.json`; it gets its own page at `/courses/<id>` and `/de/courses/<id>` |
| Teachers | `src/data/teachers.js` (name, languages); role and bio in `src/content/<language>/teachers.json` |
| The placement quiz | `src/data/quiz.js` (questions, options, the right answer, the score per level) |
| Name, address, e-mail, office hours | `src/data/site.js` |
| Discounts, the school's story | `src/content/<language>/school.json` |
| Questions and answers | `src/content/<language>/faq.json` |
| Navigation, buttons, headings, short page texts | `src/locales/en.json` and `src/locales/de.json` |
| Colours and fonts | `src/index.css` (tokens at the top); each component's own CSS file next to it |
| Photos | `src/images/` and `src/data/images.js`, with alt texts under `images` in `src/locales/<language>.json` |

Courses that have started disappear from the site by themselves: the
browser compares their start date with today.

## Two languages

Every page exists in English and in German. English is the default and
has no prefix (`/courses`); German has its own (`/de/courses`). The switch
in the header leads to the same page in the other language, and each page
sets `<html lang>` and links its other language with
`<link rel="alternate" hreflang>`.

Texts live in three places:

- **Short texts** — navigation, buttons, labels, headings, the footer — in
  `src/locales/en.json` and `src/locales/de.json`, under the same key in
  both, and used in components with `t('header.courses')`.
- **Longer texts** — courses, teachers, the FAQ, the school's story — in
  one file per language: `src/content/en/faq.json` and
  `src/content/de/faq.json` hold the same questions.
- **Facts** that are the same in every language — e-mail, address, office
  hours, prices, dates — once in `src/data/`. Dates and prices are written
  out for the page's language (`2 November 2026`, `2. November 2026`).

## JSX in `.js`

Create React App reads JSX in `.js` files; Vite reads it only in `.jsx`.
`vite.config.js` has a small plugin (`jsxInJs`) that turns the JSX in
`src/**/*.js` into plain JavaScript before anything else sees it, so the
files can keep their names.

## Deploying

`npm run build` writes a static site to `dist/`. Any static host works:
Netlify, Cloudflare Pages, GitHub Pages, your own server. Set `SITE_URL`
in `vite.config.js` and `url` in `src/data/site.js` to your domain.

## Licence

MIT, see [LICENSE](LICENSE). Images: see [IMAGES.md](IMAGES.md).
