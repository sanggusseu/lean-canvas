import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? 'text-blue-500' : '')}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
