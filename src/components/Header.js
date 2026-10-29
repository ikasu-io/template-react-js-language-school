import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation } from 'react-router-dom';
import site from '../data/site';
import useLocalePath from '../hooks/useLocalePath';
import { localePath, splitPath } from '../utils/paths';
import './Header.css';

const links = [
  { to: '/courses', label: 'header.courses' },
  { to: '/placement', label: 'header.placement' },
  { to: '/school', label: 'header.school' },
  { to: '/contact', label: 'header.contact' },
];

function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const to = useLocalePath();

  // The same page, with the same filters, in the other language.
  const { pathname, search } = useLocation();
  const { lang, path } = splitPath(pathname);
  const other = lang === 'en' ? 'de' : 'en';

  return (
    <header className="Header">
      <div className="Header-inner container">
        <Link className="Header-brand" to={to('/')} onClick={() => setOpen(false)}>
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
          {open ? t('header.close') : t('header.menu')}
        </button>
        <nav id="main-nav" className={`Header-nav${open ? ' is-open' : ''}`} aria-label={t('header.navLabel')}>
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={to(link.to)} onClick={() => setOpen(false)}>
                  {t(link.label)}
                </NavLink>
              </li>
            ))}
          </ul>
          <a className="Header-cta" href={`mailto:${site.email}`}>
            {t('header.ask')}
          </a>
          <Link
            className="Header-lang"
            to={localePath(path, other) + search}
            lang={other}
            hrefLang={other}
            onClick={() => setOpen(false)}
          >
            {t('header.otherLanguage')}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
