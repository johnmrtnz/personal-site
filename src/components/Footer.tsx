// components/Footer.tsx
import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="mailto:your.email@example.com" aria-label="Email">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
        <div className="copyright">
          <p>&copy; {currentYear} Your Name. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
