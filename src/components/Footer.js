import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import site from '../data/site';
import useLocalePath from '../hooks/useLocalePath';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  const to = useLocalePath();

  return (
    <footer className="Footer">
      <div className="container Footer-grid">
        <div>
          <p className="Footer-name">{site.fullName}</p>
          <p className="Footer-tagline">{t('site.tagline')}</p>
        </div>
        <address>
          {site.address.street}, {t('site.floor')}
          <br />
          {site.address.postcode} {site.address.city}
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </address>
        <ul className="Footer-links">
          <li><Link to={to('/courses')}>{t('footer.courses')}</Link></li>
          <li><Link to={to('/placement')}>{t('footer.placement')}</Link></li>
          <li><Link to={to('/school')}>{t('footer.school')}</Link></li>
        </ul>
      </div>
      <div className="container Footer-bottom">
        <p>{t('footer.demo')}</p>
      </div>
    </footer>
  );
}

export default Footer;
