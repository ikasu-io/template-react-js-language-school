import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useLocalePath from '../hooks/useLocalePath';
import { euros, formatDate } from '../utils/format';
import './CourseCard.css';

// One course as an index card, coloured by its level.
function CourseCard({ course }) {
  const { t, i18n } = useTranslation();
  const to = useLocalePath();
  const full = course.places === 0;

  return (
    <article className={`CourseCard level-${course.level}`}>
      <p className="CourseCard-top">
        <span className="CourseCard-level">{course.level}</span>
        <span className="CourseCard-format">{t(`formats.${course.format}`)}</span>
      </p>
      <h3>
        <Link to={to(`/courses/${course.id}`)}>{course.title}</Link>
      </h3>
      <dl className="CourseCard-facts">
        <div>
          <dt>{t('courseCard.starts')}</dt>
          <dd>{formatDate(course.start, i18n.language)}</dd>
        </div>
        <div>
          <dt>{t('courseCard.when')}</dt>
          <dd>
            {course.days}, {course.time}
          </dd>
        </div>
      </dl>
      <p className="CourseCard-bottom">
        <span className="CourseCard-price">{euros(course.price, i18n.language)}</span>
        {full ? (
          <span className="CourseCard-places is-full">{t('courseCard.full')}</span>
        ) : (
          <span className="CourseCard-places">{t('placesLeft', { count: course.places })}</span>
        )}
      </p>
    </article>
  );
}

export default CourseCard;
