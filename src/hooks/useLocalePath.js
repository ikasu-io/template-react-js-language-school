import { useTranslation } from 'react-i18next';
import { localePath } from '../utils/paths';

// Links in the language of the page: '/courses' becomes '/de/courses' on a
// German page.
export default function useLocalePath() {
  const { i18n } = useTranslation();
  return (path) => localePath(path, i18n.language);
}
