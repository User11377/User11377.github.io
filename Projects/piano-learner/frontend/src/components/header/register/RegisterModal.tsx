import './RegisterModal.css'

function RegisterModal ({ 
    onClose,
    onSwitchToLogin,
}:{
    onClose : () => void;
    onSwitchToLogin: () => void;
}) {

    return (
        <div className='modal-overlay'>
            <div className='modal'>
                <div className='modal-buttons'>
                    <h2>Registrieren</h2>
                    <button className='btn btn-close' onClick={onClose}>X</button>
                </div>
                <input type="email" placeholder="E-Mail" />
                <input type="password" placeholder="Passwort" />
                <button className="btn">Registrieren</button>
                <button className="btn" onClick={onSwitchToLogin}>Zurück zum Login</button>
            </div>
        </div>
    );
}

export default RegisterModal;