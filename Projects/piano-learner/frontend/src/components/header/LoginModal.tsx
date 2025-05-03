import './LoginModal.css';

function LoginModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Login</h2>
        <input type="email" placeholder="E-Mail" />
        <input type="password" placeholder="Passwort" />
        <div className="modal-buttons">
          <button className="btn">Einloggen</button>
          <button className="btn btn-close" onClick={onClose}>Abbrechen</button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
