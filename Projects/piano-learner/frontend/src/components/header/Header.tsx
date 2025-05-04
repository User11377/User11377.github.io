import './Header.css';
import { useState } from 'react';
import { FiSearch, FiUser } from 'react-icons/fi';
import LoginModal from './login/LoginModal';
import RegisterModal from './register/RegisterModal';

function Header() {
  const [modalMode, setModalMode] = useState<'login' | 'register' | null>(null);

  return (
    <>
      <header className={`modern-header ${modalMode ? 'blurred' : ''}`}>
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
          <button className="btn login-btn" onClick={() => setModalMode('login')}>
            Login
          </button>
          <button className="btn account-btn">
            <FiUser />
          </button>
        </div>
      </header>

      {modalMode === 'login' && (
        <LoginModal
          onClose={() => setModalMode(null)}
          onSwitchToRegister={() => setModalMode('register')}
        />
      )}

      {modalMode === 'register' && (
        <RegisterModal
          onClose={() => setModalMode(null)}
          onSwitchToLogin={() => setModalMode('login')}
        />
      )}
    </>
  );
}

export default Header;
