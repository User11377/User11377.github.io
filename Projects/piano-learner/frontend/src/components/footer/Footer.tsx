import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">Impressum</a>
        <a href="#">Datenschutz</a>
        <a href="#">Kontakt</a>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Piano Learner</p>
      </div>
    </footer>
  );
}

export default Footer;
