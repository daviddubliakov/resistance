import { FC, useState } from 'react';
import logo from '../../assets/images/logo.png';
import styles from './header.module.css';
import { Link, NavLink } from 'react-router-dom';
import MobileMenu, { MenuItem } from '../mobileMenu';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { to: '/shames', label: 'Зашквари' },
    { to: '/rating', label: 'Особи' },
    { to: '/about-us', label: 'Про проєкт' },
  ];

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <section className={styles.layout}>
          <div className={styles.links}>
            {menuItems.slice(0, 2).map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Link to="/" className={styles.logoContainer} onClick={closeMenu}>
            <img src={logo} alt="logo" className={styles.logo} width={30} height={30} />
          </Link>

          <div className={styles.links}>
            {menuItems.slice(2).map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.activeLink : ''}`}
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            data-burger-button
            className={`${styles.burgerButton} ${isMenuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </section>
      </div>

      <MobileMenu items={menuItems} isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;
