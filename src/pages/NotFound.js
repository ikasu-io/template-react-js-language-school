import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useLocalePath from '../hooks/useLocalePath';
import usePageTitle from '../hooks/usePageTitle';

function NotFound() {
  const { t } = useTranslation();
  usePageTitle(t('notFound.pageTitle'));
  const to = useLocalePath();
  return (
    <div className="container">
      <header className="page-head">
        <h1>{t('notFound.title')}</h1>
        <p>
          <Trans i18nKey="notFound.text" components={{ home: <Link to={to('/')} /> }} />
        </p>
      </header>
    </div>
  );
}

export default NotFound;
