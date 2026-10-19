import Photo from '../components/Photo';
import site from '../data/site';
import usePageTitle from '../hooks/usePageTitle';
import './Contact.css';

function Contact() {
  usePageTitle('Contact', `Write to ${site.fullName} or come by the office in ${site.address.city}.`);

  return (
    <div className="container">
      <header className="page-head">
        <h1>Say hallo</h1>
        <p>
          Write to us in English, German or anything in between. We answer within a working day and
          are happy to call you back.
        </p>
      </header>
      <div className="Contact-grid">
        <div>
          <a className="Contact-email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <h2>The office</h2>
          <address>
            {site.fullName}
            <br />
            {site.address.street}
            <br />
            {site.address.postcode} {site.address.city}
          </address>
          <dl className="Contact-hours">
            {site.officeHours.map((row) => (
              <div key={row.days}>
                <dt>{row.days}</dt>
                <dd>{row.hours}</dd>
              </div>
            ))}
          </dl>
          <h2>Getting here</h2>
          <p>{site.gettingHere}</p>
        </div>
        <div className="Contact-photos">
          <Photo name="city-walk" sizes="(min-width: 60rem) 34rem, 100vw" />
          <Photo name="online-lesson" sizes="(min-width: 60rem) 34rem, 100vw" />
          <p className="Contact-caption">
            Can’t come in? Every level is also taught online, in the evening.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
