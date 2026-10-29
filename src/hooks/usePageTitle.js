import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import site from '../data/site';

// Sets the browser tab's title and the description for each page.
export default function usePageTitle(title, description) {
  const { t } = useTranslation();
  const tagline = t('site.tagline');
  const fallback = t('meta.description');
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : `${site.name} — ${tagline}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description || fallback);
  }, [title, description, tagline, fallback]);
}
