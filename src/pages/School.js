import Faq from '../components/Faq';
import Photo from '../components/Photo';
import site from '../data/site';
import teachers from '../data/teachers';
import usePageTitle from '../hooks/usePageTitle';
import { initials } from '../utils/format';
import './School.css';

function School() {
  usePageTitle('The school', 'The teachers, the building, discounts and answers to common questions.');

  return (
    <>
      <div className="container">
        <header className="page-head">
          <h1>The school</h1>
          <p>
            Two classrooms, a kitchen and a courtyard with a linden tree, in an old brick school in{' '}
            {site.address.city}. Founded in 2015 by Mira and Jonas, who had both taught German abroad.
          </p>
        </header>
      </div>

      <div className="container School-photos">
        <Photo name="courtyard" eager sizes="(min-width: 60rem) 44rem, 100vw" className="School-wide" />
        <Photo name="notebooks" eager sizes="(min-width: 60rem) 26rem, 100vw" />
      </div>

      <section className="section container">
        <p className="eyebrow">Teachers</p>
        <h2 className="School-title">Six of us, all of whom moved once</h2>
        <ul className="School-teachers">
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <span className="School-initials" aria-hidden="true">
                {initials(teacher.name)}
              </span>
              <h3>{teacher.name}</h3>
              <p className="School-role">{teacher.role}</p>
              <p>{teacher.bio}</p>
              <p className="School-languages">Speaks {teacher.languages.join(', ')}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section School-discounts">
        <div className="container School-discounts-grid">
          <div>
            <p className="eyebrow">Prices</p>
            <h2 className="School-title">Ways to pay less</h2>
          </div>
          <ul>
            {site.discounts.map((discount) => (
              <li key={discount}>{discount}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section container School-faq">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="School-title">Before you book</h2>
          <Photo name="whiteboard-hands" sizes="(min-width: 60rem) 22rem, 100vw" className="School-faq-photo" />
        </div>
        <Faq />
      </section>
    </>
  );
}

export default School;
