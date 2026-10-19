import { Link } from 'react-router-dom';
import Photo from '../components/Photo';
import CourseCard from '../components/CourseCard';
import LevelPath from '../components/LevelPath';
import quotes from '../data/quotes';
import site from '../data/site';
import usePageTitle from '../hooks/usePageTitle';
import { upcomingCourses } from '../utils/courses';
import './Home.css';

const reasons = [
  {
    title: 'Ten people at most',
    text: 'Every class has ten seats. You will speak in every lesson, whether you planned to or not.',
  },
  {
    title: 'Evenings that fit a job',
    text: 'Two evenings a week from 18:30, or online after the children are in bed.',
  },
  {
    title: 'German you need here',
    text: 'Letters from the Finanzamt, calls to the landlord, small talk at the bakery — not dialogues about trains.',
  },
];

function Home() {
  usePageTitle();
  const next = upcomingCourses().slice(0, 3);

  return (
    <>
      <section className="Home-hero">
        <div className="container Home-hero-grid">
          <div>
            <p className="eyebrow">German school in {site.address.city} · since 2015</p>
            <h1>
              German for people who <span className="mark">live here now</span>.
            </h1>
            <p className="Home-lead">
              Small classes from A1 to C1, in the mornings, evenings or online, with teachers who
              moved countries themselves and know which words you need first.
            </p>
            <p className="Home-actions">
              <Link className="button" to="/placement">
                Find your level in 3 minutes
              </Link>
              <Link className="button is-light" to="/courses">
                See all courses
              </Link>
            </p>
          </div>
          <div className="Home-hero-photo">
            <Photo name="hero-classroom" eager sizes="(min-width: 60rem) 36rem, 100vw" />
            <p className="Home-sticky">
              Next start: <strong>{next[0] ? next[0].title : 'soon'}</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="section container">
        <p className="eyebrow">Five levels</p>
        <h2 className="Home-title">From “Hallo” to the university</h2>
        <LevelPath />
      </section>

      <section className="section Home-next">
        <div className="container">
          <div className="Home-next-head">
            <div>
              <p className="eyebrow">Starting soon</p>
              <h2 className="Home-title">The next courses</h2>
            </div>
            <Link to="/courses">All courses →</Link>
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
          <p className="eyebrow">Why Satzbau</p>
          <h2 className="Home-title">A school, not a call centre</h2>
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
        <p className="eyebrow">Students</p>
        <h2 className="Home-title">In their words</h2>
        <div className="Home-quotes">
          {quotes.map((quote) => (
            <figure key={quote.name}>
              <blockquote>“{quote.text}”</blockquote>
              <figcaption>— {quote.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container Home-quiz">
        <div>
          <h2>Not sure where to start?</h2>
          <p>Ten questions, no sign-up, a level and the right courses at the end.</p>
        </div>
        <Link className="button" to="/placement">
          Take the placement quiz
        </Link>
      </section>
    </>
  );
}

export default Home;
