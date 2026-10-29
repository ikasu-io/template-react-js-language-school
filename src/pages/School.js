import { useTranslation } from 'react-i18next';
import Faq from '../components/Faq';
import Photo from '../components/Photo';
import { useContent } from '../content';
import teachers from '../data/teachers';
import usePageTitle from '../hooks/usePageTitle';
import { initials, languageNames } from '../utils/format';
import './School.css';

function School() {
  const { t, i18n } = useTranslation();
  usePageTitle(t('school.pageTitle'), t('school.description'));
  const school = useContent('school');
  const texts = useContent('teachers');

  return (
    <>
      <div className="container">
        <header className="page-head">
          <h1>{t('school.title')}</h1>
          <p>{school.intro}</p>
        </header>
      </div>

      <div className="container School-photos">
        <Photo name="courtyard" eager sizes="(min-width: 60rem) 44rem, 100vw" className="School-wide" />
        <Photo name="notebooks" eager sizes="(min-width: 60rem) 26rem, 100vw" />
      </div>

      <section className="section container">
        <p className="eyebrow">{t('school.teachersEyebrow')}</p>
        <h2 className="School-title">{t('school.teachersTitle')}</h2>
        <ul className="School-teachers">
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <span className="School-initials" aria-hidden="true">
                {initials(teacher.name)}
              </span>
              <h3>{teacher.name}</h3>
              <p className="School-role">{texts[teacher.id].role}</p>
              <p>{texts[teacher.id].bio}</p>
              <p className="School-languages">
                {t('school.speaks', { languages: languageNames(teacher.languages, i18n.language) })}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section School-discounts">
        <div className="container School-discounts-grid">
          <div>
            <p className="eyebrow">{t('school.pricesEyebrow')}</p>
            <h2 className="School-title">{t('school.pricesTitle')}</h2>
          </div>
          <ul>
            {school.discounts.map((discount) => (
              <li key={discount}>{discount}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section container School-faq">
        <div>
          <p className="eyebrow">{t('school.faqEyebrow')}</p>
          <h2 className="School-title">{t('school.faqTitle')}</h2>
          <Photo name="whiteboard-hands" sizes="(min-width: 60rem) 22rem, 100vw" className="School-faq-photo" />
        </div>
        <Faq />
      </section>
    </>
  );
}

export default School;
