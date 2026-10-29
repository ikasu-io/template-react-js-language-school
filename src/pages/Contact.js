import { useTranslation } from 'react-i18next';
import Photo from '../components/Photo';
import { useContent } from '../content';
import site from '../data/site';
import usePageTitle from '../hooks/usePageTitle';
import './Contact.css';

function Contact() {
  const { t } = useTranslation();
  usePageTitle(
    t('contact.pageTitle'),
    t('contact.description', { name: site.fullName, city: site.address.city }),
  );
  const { gettingHere } = useContent('contact');

  return (
    <div className="container">
      <header className="page-head">
        <h1>{t('contact.title')}</h1>
        <p>{t('contact.lead')}</p>
      </header>
      <div className="Contact-grid">
        <div>
          <a className="Contact-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <h2>{t('contact.office')}</h2>
          <address>
            {site.fullName}
            <br />
            {site.address.street}, {t('site.floor')}
            <br />
            {site.address.postcode} {site.address.city}
          </address>
          <dl className="Contact-hours">
            {site.officeHours.map((row) => (
              <div key={row.days}>
                <dt>{t(`contact.${row.days}`)}</dt>
                <dd>{row.hours}</dd>
              </div>
            ))}
          </dl>
          <h2>{t('contact.gettingHere')}</h2>
          <p>{gettingHere}</p>
        </div>
        <div className="Contact-photos">
          <Photo name="city-walk" sizes="(min-width: 60rem) 34rem, 100vw" />
          <Photo name="online-lesson" sizes="(min-width: 60rem) 34rem, 100vw" />
          <p className="Contact-caption">{t('contact.caption')}</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
