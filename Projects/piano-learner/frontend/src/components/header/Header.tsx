import './Header.css';
import { useState } from 'react';
import { FiSearch, FiUser } from 'react-icons/fi';
import LoginModal from './login/LoginModal';

function Header() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <header className={`modern-header ${showLogin ? 'blurred' : ''}`}>
        <div className="logo-area">
          <h1 className="logo-text">Piano Learner</h1>
          <p className="tagline">
            “Be consistent and you achieve everything” – Johannes Mayer
          </p>
        </div>

        <div className="actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Suche nach Inhalten..." />
          </div>
          <button className="btn login-btn" onClick={() => setShowLogin(true)}>
            Login
          </button>
          <button className="btn account-btn">
            <FiUser />
          </button>
        </div>
      </header>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

export default Header;
