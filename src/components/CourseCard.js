import { Link } from 'react-router-dom';
import { FORMATS } from '../utils/courses';
import { euros, formatDate } from '../utils/format';
import './CourseCard.css';

// One course as an index card, coloured by its level.
function CourseCard({ course }) {
  const full = course.places === 0;

  return (
    <article className={`CourseCard level-${course.level}`}>
      <p className="CourseCard-top">
        <span className="CourseCard-level">{course.level}</span>
        <span className="CourseCard-format">{FORMATS[course.format]}</span>
      </p>
      <h3>
        <Link to={`/courses/${course.id}`}>{course.title}</Link>
      </h3>
      <dl className="CourseCard-facts">
        <div>
          <dt>Starts</dt>
          <dd>{formatDate(course.start)}</dd>
        </div>
        <div>
          <dt>When</dt>
          <dd>
            {course.days}, {course.time}
          </dd>
        </div>
      </dl>
      <p className="CourseCard-bottom">
        <span className="CourseCard-price">{euros(course.price)}</span>
        {full ? (
          <span className="CourseCard-places is-full">Full — waiting list</span>
        ) : (
          <span className="CourseCard-places">
            {course.places} {course.places === 1 ? 'place' : 'places'} left
          </span>
        )}
      </p>
    </article>
  );
}

export default CourseCard;
