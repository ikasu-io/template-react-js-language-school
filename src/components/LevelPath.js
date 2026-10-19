import { Link } from 'react-router-dom';
import levels from '../data/levels';
import './LevelPath.css';

// The levels A1–C1 as steps on a path, each with what you can do there.
const LevelPath = ({ highlight }) => (
  <ol className="LevelPath">
    {levels.map((level, index) => (
      <li key={level.key} className={level.key === highlight ? 'is-current' : undefined}>
        <span className="LevelPath-step">{index + 1}</span>
        <Link className="LevelPath-key" to={`/courses?level=${level.key}`}>
          {level.key}
        </Link>
        <span className="LevelPath-name">{level.name}</span>
        <p>{level.canDo}</p>
      </li>
    ))}
  </ol>
);

export default LevelPath;
