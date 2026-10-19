import { useEffect } from 'react';
import site from '../data/site';

// Sets the browser tab's title and the description for each page.
export default function usePageTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} · ${site.name}` : `${site.name} — ${site.tagline}`;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
