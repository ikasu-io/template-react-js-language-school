import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

function NotFound() {
  usePageTitle('Page not found');
  return (
    <div className="container">
      <header className="page-head">
        <h1>Diese Seite gibt es nicht.</h1>
        <p>
          That’s German for “this page doesn’t exist”. You’ve already learnt something.{' '}
          <Link to="/">Back to the start</Link>.
        </p>
      </header>
    </div>
  );
}

export default NotFound;
