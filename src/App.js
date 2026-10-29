import { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import site from './data/site';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Placement from './pages/Placement';
import School from './pages/School';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { alternates } from './utils/paths';

// Start every page at the top, as a normal website would.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// The pages in one language: switches the texts, sets <html lang> and links
// the same page in the other languages.
function Layout({ lang }) {
  const { i18n, t } = useTranslation();
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [i18n, lang]);

  useEffect(() => {
    for (const { hreflang, href } of alternates(pathname, site.url)) {
      let link = document.head.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!link) {
        link = Object.assign(document.createElement('link'), { rel: 'alternate', hreflang });
        document.head.append(link);
      }
      link.href = href;
    }
  }, [pathname]);

  return (
    <>
      <a className="skip" href="#main">
        {t('skip')}
      </a>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const pages = (
  <>
    <Route index element={<Home />} />
    <Route path="courses" element={<Courses />} />
    <Route path="courses/:id" element={<CourseDetail />} />
    <Route path="placement" element={<Placement />} />
    <Route path="school" element={<School />} />
    <Route path="contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout lang="en" />}>
        {pages}
      </Route>
      <Route path="/de" element={<Layout lang="de" />}>
        {pages}
      </Route>
    </Routes>
  );
}

export default App;
