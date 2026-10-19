import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import site from '../data/site';
import './Header.css';

const links = [
  { to: '/courses', label: 'Courses' },
  { to: '/placement', label: 'Find your level' },
  { to: '/school', label: 'The school' },
  { to: '/contact', label: 'Contact' },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="Header">
      <div className="Header-inner container">
        <Link className="Header-brand" to="/" onClick={() => setOpen(false)}>
          <span className="Header-mark" aria-hidden="true">S</span>
          {site.name}
        </Link>
        <button
          type="button"
          className="Header-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav id="main-nav" className={`Header-nav${open ? ' is-open' : ''}`} aria-label="Main">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} onClick={() => setOpen(false)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a className="Header-cta" href={`mailto:${site.email}`}>
            Ask us
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
