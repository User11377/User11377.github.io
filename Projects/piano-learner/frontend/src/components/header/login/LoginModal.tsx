import { useState } from 'react';
import './LoginModal.css';


function LoginModal({ 
  onClose,
  onSwitchToRegister,
  
}: { 
  onClose: () => void 
  onSwitchToRegister: ()=>void;
})   {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
        const response = await fetch('http://localhost:4000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Login erfolgreich:', data);
            localStorage.setItem('token', data.token); // Token speichern
            onClose(); // Modal schließen
        } else {
            setError(data.message || 'Etwas ist schief gelaufen.');
        }
    } catch (error) {
        console.error('Fehler beim Login:', error);
        setError('Fehler bei der Anfrage.');
    } finally {
        setLoading(false);
    }
};

  //VIew 
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-buttons">
          <h2>Login</h2>
          <button className="btn btn-close" onClick={onClose}>X</button>
        </div>
        <input 
          type="email" 
          placeholder="E-Mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Passwort" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="error-message">{error}</div>}
        <button className="btn" onClick={handleLogin} disabled={loading}>
          {loading ? 'Einloggen...' : 'Einloggen'}
        </button>
        <button className='btn' onClick={onSwitchToRegister}>Registrieren</button>
      </div>
    </div>
  );
}

export default LoginModal;
