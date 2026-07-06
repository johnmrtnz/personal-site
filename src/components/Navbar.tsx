// components/Navbar.tsx
import React, { useState } from 'react';
import './Navbar.css';

interface NavbarProps {
  base?: string;
}

const Navbar: React.FC<NavbarProps> = ({ base = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href={`${base}/`} className="navbar-logo">
          John Martinez
        </a>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <a href={`${base}/#about`} className="nav-link" onClick={() => setIsMenuOpen(false)}>
              About Me
            </a>
          </li>

          <li className="nav-item">
            <a href={`${base}/#experience`} className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Experience
            </a>
          </li>

          <li className="nav-item">
            <a href={`${base}/blog/`} className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Blog
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
