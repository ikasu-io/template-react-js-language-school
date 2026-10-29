import { Trans, useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useContent } from '../content';
import site from '../data/site';
import useLocalePath from '../hooks/useLocalePath';
import usePageTitle from '../hooks/usePageTitle';
import { findCourse, findTeacher } from '../utils/courses';
import { euros, formatDate, initials } from '../utils/format';
import NotFound from './NotFound';
import './CourseDetail.css';

function CourseDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const to = useLocalePath();
  const levels = useContent('levels');
  const course = findCourse(id, lang);
  usePageTitle(
    course?.title,
    course &&
      t('course.description', {
        title: course.title,
        days: course.days,
        time: course.time,
        start: formatDate(course.start, lang),
      }),
  );

  if (!course) return <NotFound />;

  const teacher = findTeacher(course.teacher, lang);
  const level = levels[course.level];
  const subject = encodeURIComponent(
    t('course.subject', { title: course.title, start: formatDate(course.start, lang) }),
  );

  return (
    <div className="container CourseDetail">
      <p className="CourseDetail-back">
        <Link to={to('/courses')}>{t('course.back')}</Link>
      </p>
      <header className="page-head">
        <h1>{course.title}</h1>
        <p>
          {t('course.summary', {
            level: level.name,
            format: t(`formats.${course.format}`),
            lessons: course.lessons,
          })}
        </p>
      </header>

      <div className="CourseDetail-grid">
        <section>
          <h2>{t('course.outcomes')}</h2>
          <ul className="CourseDetail-outcomes">
            {course.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>

          <h2>{t('course.schedule')}</h2>
          <table className="CourseDetail-table">
            <tbody>
              <tr>
                <th scope="row">{t('course.dates')}</th>
                <td>
                  {formatDate(course.start, lang)} – {formatDate(course.end, lang)}
                </td>
              </tr>
              <tr>
                <th scope="row">{t('course.days')}</th>
                <td>{course.days}</td>
              </tr>
              <tr>
                <th scope="row">{t('course.time')}</th>
                <td>{course.time}</td>
              </tr>
              <tr>
                <th scope="row">{t('course.where')}</th>
                <td>
                  {course.format === 'online'
                    ? t('course.online')
                    : `${site.address.street}, ${t('site.floor')}, ${site.address.city}`}
                </td>
              </tr>
            </tbody>
          </table>

          {teacher && (
            <div className="CourseDetail-teacher">
              <span className="CourseDetail-initials" aria-hidden="true">
                {initials(teacher.name)}
              </span>
              <div>
                <h3>{teacher.name}</h3>
                <p>{teacher.bio}</p>
              </div>
            </div>
          )}
        </section>

        <aside className="CourseDetail-box">
          <p className="CourseDetail-price">{euros(course.price, lang)}</p>
          <p>{t('course.priceNote')}</p>
          {course.places > 0 ? (
            <>
              <p className="CourseDetail-places">{t('placesLeft', { count: course.places })}</p>
              <a className="button" href={`mailto:${site.email}?subject=${subject}`}>
                {t('course.ask')}
              </a>
            </>
          ) : (
            <>
              <p className="CourseDetail-places is-full">{t('course.full')}</p>
              <a className="button is-light" href={`mailto:${site.email}?subject=${subject}`}>
                {t('course.waitingList')}
              </a>
            </>
          )}
          <p className="CourseDetail-small">
            <Trans i18nKey="course.notSure" components={{ quiz: <Link to={to('/placement')} /> }} />
          </p>
        </aside>
      </div>
    </div>
  );
}

export default CourseDetail;
