import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Photo from '../components/Photo';
import CourseCard from '../components/CourseCard';
import LevelPath from '../components/LevelPath';
import { useContent } from '../content';
import site from '../data/site';
import useLocalePath from '../hooks/useLocalePath';
import usePageTitle from '../hooks/usePageTitle';
import { upcomingCourses } from '../utils/courses';
import './Home.css';

function Home() {
  usePageTitle();
  const { t, i18n } = useTranslation();
  const to = useLocalePath();
  const { reasons } = useContent('home');
  const quotes = useContent('quotes');
  const next = upcomingCourses(i18n.language).slice(0, 3);

  return (
    <>
      <section className="Home-hero">
        <div className="container Home-hero-grid">
          <div>
            <p className="eyebrow">{t('home.eyebrow', { city: site.address.city })}</p>
            <h1>
              <Trans i18nKey="home.title" components={{ mark: <span className="mark" /> }} />
            </h1>
            <p className="Home-lead">{t('home.lead')}</p>
            <p className="Home-actions">
              <Link className="button" to={to('/placement')}>
                {t('home.findLevel')}
              </Link>
              <Link className="button is-light" to={to('/courses')}>
                {t('home.seeCourses')}
              </Link>
            </p>
          </div>
          <div className="Home-hero-photo">
            <Photo name="hero-classroom" eager sizes="(min-width: 60rem) 36rem, 100vw" />
            <p className="Home-sticky">
              <Trans
                i18nKey="home.nextStart"
                values={{ title: next[0] ? next[0].title : t('home.soon') }}
                components={{ strong: <strong /> }}
              />
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <p className="eyebrow">{t('home.levelsEyebrow')}</p>
        <h2 className="Home-title">{t('home.levelsTitle')}</h2>
        <LevelPath />
      </section>

      <section className="section Home-next">
        <div className="container">
          <div className="Home-next-head">
            <div>
              <p className="eyebrow">{t('home.nextEyebrow')}</p>
              <h2 className="Home-title">{t('home.nextTitle')}</h2>
            </div>
            <Link to={to('/courses')}>{t('home.allCourses')}</Link>
          </div>
          <div className="Home-cards">
            {next.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="section container Home-why">
        <Photo name="kitchen-break" sizes="(min-width: 60rem) 30rem, 100vw" className="Home-why-photo" />
        <div>
          <p className="eyebrow">{t('home.whyEyebrow')}</p>
          <h2 className="Home-title">{t('home.whyTitle')}</h2>
          <ul className="Home-reasons">
            {reasons.map((reason) => (
              <li key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section container">
        <p className="eyebrow">{t('home.quotesEyebrow')}</p>
        <h2 className="Home-title">{t('home.quotesTitle')}</h2>
        <div className="Home-quotes">
          {quotes.map((quote) => (
            <figure key={quote.name}>
              <blockquote>{t('home.quote', { text: quote.text })}</blockquote>
              <figcaption>— {quote.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container Home-quiz">
        <div>
          <h2>{t('home.quizTitle')}</h2>
          <p>{t('home.quizText')}</p>
        </div>
        <Link className="button" to={to('/placement')}>
          {t('home.quizButton')}
        </Link>
      </section>
    </>
  );
}

export default Home;
