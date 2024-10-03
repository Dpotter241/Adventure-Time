import { Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar = ({}) => {
  return (
    <div className="nav-bar-container">
      <ul className="nav-bar">
        <li>
          <Link to={'/Themes'}>Themes</Link>
        </li>
        <li>
          <Link to={'/Characters'}>Characters</Link>
        </li>
        <li>
          <Link to={'/Plots'}>Plots</Link>
        </li>
        <li>
          <Link to={'/Submissions'}>My Submissions</Link>
        </li>
      </ul>
    </div>
  );
};
