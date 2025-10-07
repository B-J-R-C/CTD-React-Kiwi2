
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ title }) => {
  // Anonymous function for NavLink's className prop
  const getNavLinkClass = ({ isActive }) => {
    if (isActive) {
      return styles.active; // CSS Module class
    }
    return styles.inactive;
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>{title}</h1>
      <nav className={styles.nav}>
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={getNavLinkClass}>
          About
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;