import { Link } from 'react-router-dom';
import site from '../data/site';
import './Footer.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className="container Footer-grid">
        <div>
          <p className="Footer-name">{site.fullName}</p>
          <p className="Footer-tagline">{site.tagline}</p>
        </div>
        <address>
          {site.address.street}
          <br />
          {site.address.postcode} {site.address.city}
          <br />
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </address>
        <ul className="Footer-links">
          <li><Link to="/courses">All courses</Link></li>
          <li><Link to="/placement">Placement quiz</Link></li>
          <li><Link to="/school">Teachers &amp; prices</Link></li>
        </ul>
      </div>
      <div className="container Footer-bottom">
        <p>Fictional demo site — content and images generated with AI</p>
      </div>
    </footer>
  );
}

export default Footer;
