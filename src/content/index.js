import { useTranslation } from 'react-i18next';

// Longer texts, one folder per language: content/en/faq.json and
// content/de/faq.json hold the same questions in English and in German.
const files = import.meta.glob('./*/*.json', { eager: true, import: 'default' });

export function content(lang, name) {
  return files[`./${lang}/${name}.json`];
}

// A content file in the language of the page being shown.
export function useContent(name) {
  const { i18n } = useTranslation();
  return content(i18n.language, name);
}
