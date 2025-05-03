import './LoginModal.css';


function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-buttons">
          <h2>Login</h2>
          <button className="btn btn-close" onClick={onClose}>X</button>
        </div>
        <input type="email" placeholder="E-Mail" />
        <input type="password" placeholder="Passwort" />
        <button className="btn">Einloggen</button>
        <button className='btn'>Registrieren</button>
      </div>
    </div>
  );
}

export default LoginModal;
