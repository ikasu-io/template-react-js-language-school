import { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import levels from '../data/levels';
import quiz, { levelForScore } from '../data/quiz';
import usePageTitle from '../hooks/usePageTitle';
import { upcomingCourses } from '../utils/courses';
import './Placement.css';

// The placement quiz: one question at a time, then a level and the courses
// that match it. Nothing is sent anywhere; it all happens in the browser.
function Placement() {
  usePageTitle('Find your level', 'A ten-question German placement quiz with a suggested level from A1 to C1.');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const done = step === quiz.length;

  function answer(index) {
    setAnswers([...answers, index]);
    setStep(step + 1);
  }

  function restart() {
    setAnswers([]);
    setStep(0);
  }

  if (done) {
    const score = answers.filter((a, i) => a === quiz[i].answer).length;
    const levelKey = levelForScore(score);
    const level = levels.find((l) => l.key === levelKey);
    const matching = upcomingCourses()
      .filter((course) => course.level === levelKey)
      .slice(0, 3);

    return (
      <div className="container">
        <header className="page-head">
          <h1>
            Your level: <span className="mark">{levelKey}</span>
          </h1>
          <p>
            {score} of {quiz.length} right. {level.name}: {level.canDo}
          </p>
        </header>
        {matching.length > 0 && (
          <>
            <h2 className="Placement-subtitle">Courses at {levelKey}</h2>
            <div className="Placement-courses">
              {matching.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
        <p className="Placement-note">
          A quiz is only a start — on your first day we talk for fifteen minutes and move you if
          another class fits better. <button type="button" onClick={restart}>Take it again</button>
        </p>
      </div>
    );
  }

  const question = quiz[step];

  return (
    <div className="container">
      <header className="page-head">
        <h1>Find your level</h1>
        <p>Ten sentences, getting harder. Pick the word that fits — guessing is fine, stopping is too.</p>
      </header>
      <section className="Placement-card" aria-live="polite">
        <p className="Placement-progress">
          Question {step + 1} of {quiz.length}
          <span className="Placement-bar">
            <span style={{ width: `${(step / quiz.length) * 100}%` }} />
          </span>
        </p>
        <h2 className="Placement-question" lang="de">
          {question.question.split('___').map((part, i, parts) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && (
                <span className="Placement-gap">
                  <span className="visually-hidden">___</span>
                </span>
              )}
            </span>
          ))}
        </h2>
        <div className="Placement-options">
          {question.options.map((option, index) => (
            <button key={option} type="button" lang="de" onClick={() => answer(index)}>
              {option}
            </button>
          ))}
        </div>
        <p className="Placement-skip">
          <button type="button" onClick={() => setStep(quiz.length)}>
            I don’t know any more — show my result
          </button>
        </p>
      </section>
      <p className="Placement-note">
        Prefer to talk? <Link to="/contact">Come by the office</Link> for a free 15-minute chat.
      </p>
    </div>
  );
}

export default Placement;
