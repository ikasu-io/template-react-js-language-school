import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import { useContent } from '../content';
import quiz, { levelForScore } from '../data/quiz';
import useLocalePath from '../hooks/useLocalePath';
import usePageTitle from '../hooks/usePageTitle';
import { upcomingCourses } from '../utils/courses';
import './Placement.css';

// The placement quiz: one question at a time, then a level and the courses
// that match it. Nothing is sent anywhere; it all happens in the browser.
function Placement() {
  const { t, i18n } = useTranslation();
  usePageTitle(t('placement.pageTitle'), t('placement.description'));
  const to = useLocalePath();
  const levels = useContent('levels');
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
    const level = levels[levelKey];
    const matching = upcomingCourses(i18n.language)
      .filter((course) => course.level === levelKey)
      .slice(0, 3);

    return (
      <div className="container">
        <header className="page-head">
          <h1>
            <Trans
              i18nKey="placement.result"
              values={{ level: levelKey }}
              components={{ mark: <span className="mark" /> }}
            />
          </h1>
          <p>
            {t('placement.score', { score, total: quiz.length, name: level.name, canDo: level.canDo })}
          </p>
        </header>
        {matching.length > 0 && (
          <>
            <h2 className="Placement-subtitle">{t('placement.coursesAt', { level: levelKey })}</h2>
            <div className="Placement-courses">
              {matching.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
        <p className="Placement-note">
          {t('placement.note')}{' '}
          <button type="button" onClick={restart}>{t('placement.again')}</button>
        </p>
      </div>
    );
  }

  const question = quiz[step];

  return (
    <div className="container">
      <header className="page-head">
        <h1>{t('placement.title')}</h1>
        <p>{t('placement.lead')}</p>
      </header>
      <section className="Placement-card" aria-live="polite">
        <p className="Placement-progress">
          {t('placement.progress', { step: step + 1, total: quiz.length })}
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
            {t('placement.skip')}
          </button>
        </p>
      </section>
      <p className="Placement-note">
        <Trans i18nKey="placement.talk" components={{ contact: <Link to={to('/contact')} /> }} />
      </p>
    </div>
  );
}

export default Placement;
