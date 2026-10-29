import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import de from './locales/de.json';
import { languages, splitPath } from './utils/paths';

// Short texts (navigation, buttons, labels, headings) by key, one file per
// language: src/locales/en.json and src/locales/de.json. Longer texts are in
// src/content/<language>/. The language comes from the address: /de/… is German.
i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, de: { translation: de } },
  lng: splitPath(window.location.pathname).lang,
  fallbackLng: 'en',
  supportedLngs: languages,
  interpolation: { escapeValue: false }, // React escapes already
});

export default i18n;
