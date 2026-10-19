import { Link, useParams } from 'react-router-dom';
import levels from '../data/levels';
import site from '../data/site';
import usePageTitle from '../hooks/usePageTitle';
import { FORMATS, findCourse, findTeacher } from '../utils/courses';
import { euros, formatDate, initials } from '../utils/format';
import NotFound from './NotFound';
import './CourseDetail.css';

function CourseDetail() {
  const { id } = useParams();
  const course = findCourse(id);
  usePageTitle(course?.title, course && `${course.title}: ${course.days}, ${course.time}, from ${formatDate(course.start)}.`);

  if (!course) return <NotFound />;

  const teacher = findTeacher(course.teacher);
  const level = levels.find((l) => l.key === course.level);
  const subject = encodeURIComponent(`Place in ${course.title} (${formatDate(course.start)})`);

  return (
    <div className="container CourseDetail">
      <p className="CourseDetail-back">
        <Link to="/courses">← All courses</Link>
      </p>
      <header className="page-head">
        <h1>{course.title}</h1>
        <p>
          {level.name} · {FORMATS[course.format]} · {course.lessons} lessons of 45 minutes
        </p>
      </header>

      <div className="CourseDetail-grid">
        <section>
          <h2>Afterwards you can</h2>
          <ul className="CourseDetail-outcomes">
            {course.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>

          <h2>Schedule</h2>
          <table className="CourseDetail-table">
            <tbody>
              <tr>
                <th scope="row">Dates</th>
                <td>
                  {formatDate(course.start)} – {formatDate(course.end)}
                </td>
              </tr>
              <tr>
                <th scope="row">Days</th>
                <td>{course.days}</td>
              </tr>
              <tr>
                <th scope="row">Time</th>
                <td>{course.time}</td>
              </tr>
              <tr>
                <th scope="row">Where</th>
                <td>
                  {course.format === 'online'
                    ? 'Online — you get the link a week before'
                    : `${site.address.street}, ${site.address.city}`}
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
          <p className="CourseDetail-price">{euros(course.price)}</p>
          <p>for the whole course, books included</p>
          {course.places > 0 ? (
            <>
              <p className="CourseDetail-places">
                {course.places} {course.places === 1 ? 'place' : 'places'} left
              </p>
              <a className="button" href={`mailto:${site.email}?subject=${subject}`}>
                Ask for a place
              </a>
            </>
          ) : (
            <>
              <p className="CourseDetail-places is-full">This course is full.</p>
              <a className="button is-light" href={`mailto:${site.email}?subject=${subject}`}>
                Join the waiting list
              </a>
            </>
          )}
          <p className="CourseDetail-small">
            Not sure it’s your level? <Link to="/placement">Take the quiz</Link>.
          </p>
        </aside>
      </div>
    </div>
  );
}

export default CourseDetail;
