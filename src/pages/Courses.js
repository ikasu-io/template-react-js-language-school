import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import levels from '../data/levels';
import usePageTitle from '../hooks/usePageTitle';
import { FORMATS, upcomingCourses } from '../utils/courses';
import './Courses.css';

// All courses that haven't started, filtered by level and format. The
// filters live in the address (?level=B1&format=evening), so a filtered list
// can be linked to.
function Courses() {
  const { t, i18n } = useTranslation();
  usePageTitle(t('courses.pageTitle'), t('courses.description'));
  const [params, setParams] = useSearchParams();
  const level = params.get('level') || 'all';
  const format = params.get('format') || 'all';

  const shown = upcomingCourses(i18n.language).filter(
    (course) =>
      (level === 'all' || course.level === level) && (format === 'all' || course.format === format),
  );

  function choose(key, value) {
    const next = new URLSearchParams(params);
    if (value === 'all') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  }

  return (
    <div className="container">
      <header className="page-head">
        <h1>{t('courses.title')}</h1>
        <p>{t('courses.lead')}</p>
      </header>

      <div className="Courses-filters">
        <fieldset>
          <legend>{t('courses.level')}</legend>
          {['all', ...levels].map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={level === key}
              onClick={() => choose('level', key)}
            >
              {key === 'all' ? t('courses.allLevels') : key}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>{t('courses.format')}</legend>
          {['all', ...FORMATS].map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={format === key}
              onClick={() => choose('format', key)}
            >
              {key === 'all' ? t('courses.allFormats') : t(`formats.${key}`)}
            </button>
          ))}
        </fieldset>
      </div>

      <h2 className="visually-hidden">{t('courses.listTitle')}</h2>
      {shown.length > 0 ? (
        <div className="Courses-grid">
          {shown.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="Courses-empty">{t('courses.empty')}</p>
      )}
    </div>
  );
}

export default Courses;
