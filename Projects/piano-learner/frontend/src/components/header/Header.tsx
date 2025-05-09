import './Header.css';
import { useState } from 'react';
import { FiSearch, FiUser } from 'react-icons/fi';
import LoginModal from './login/LoginModal';
import RegisterModal from './register/RegisterModal';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [modalMode, setModalMode] = useState<'login' | 'register' | null>(null);
  const navigate = useNavigate();

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
            <div className="search-icon">
              <FiSearch />
            </div>
            <input type="text" placeholder="Suche nach Inhalten..." />
          </div>
          <button className="btn login-btn" onClick={() => setModalMode('login')}>
            Login
          </button>
          {/* Profile Button*/}
          <button className="btn account-btn" onClick={() => navigate('/profile')}>
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
