import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__copyright">
        <p className="footer__text">&copy; {currentYear} Mesto Russia</p>
      </div>
    </footer>
  );
}

export default Footer;
