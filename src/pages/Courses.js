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
  usePageTitle('Courses', 'German courses from A1 to C1: intensive, evening, online and exam preparation.');
  const [params, setParams] = useSearchParams();
  const level = params.get('level') || 'all';
  const format = params.get('format') || 'all';

  const shown = upcomingCourses().filter(
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
        <h1>Courses</h1>
        <p>Every course has ten places at most. Prices are for the whole course, books included.</p>
      </header>

      <div className="Courses-filters">
        <fieldset>
          <legend>Level</legend>
          {['all', ...levels.map((l) => l.key)].map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={level === key}
              onClick={() => choose('level', key)}
            >
              {key === 'all' ? 'All levels' : key}
            </button>
          ))}
        </fieldset>
        <fieldset>
          <legend>Format</legend>
          {['all', ...Object.keys(FORMATS)].map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={format === key}
              onClick={() => choose('format', key)}
            >
              {key === 'all' ? 'All formats' : FORMATS[key]}
            </button>
          ))}
        </fieldset>
      </div>

      <h2 className="visually-hidden">Courses starting soon</h2>
      {shown.length > 0 ? (
        <div className="Courses-grid">
          {shown.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="Courses-empty">
          No course like that is planned right now. Write to us — if three people ask, we start one.
        </p>
      )}
    </div>
  );
}

export default Courses;
