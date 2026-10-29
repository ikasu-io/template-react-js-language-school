import { Link } from 'react-router-dom';
import { useContent } from '../content';
import levels from '../data/levels';
import useLocalePath from '../hooks/useLocalePath';
import './LevelPath.css';

// The levels A1–C1 as steps on a path, each with what you can do there.
const LevelPath = ({ highlight }) => {
  const texts = useContent('levels');
  const to = useLocalePath();

  return (
    <ol className="LevelPath">
      {levels.map((key, index) => (
        <li key={key} className={key === highlight ? 'is-current' : undefined}>
          <span className="LevelPath-step">{index + 1}</span>
          <Link className="LevelPath-key" to={to(`/courses?level=${key}`)}>
            {key}
          </Link>
          <span className="LevelPath-name">{texts[key].name}</span>
          <p>{texts[key].canDo}</p>
        </li>
      ))}
    </ol>
  );
};

export default LevelPath;
