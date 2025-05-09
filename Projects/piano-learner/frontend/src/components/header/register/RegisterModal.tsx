import { useState } from 'react';
import './RegisterModal.css';

function RegisterModal({
    onClose,
    onSwitchToLogin,
}: {
    onClose: () => void;
    onSwitchToLogin: () => void;
}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [username, setUsername] = useState('');


    const handleRegister = async () => {
        setLoading(true);
        setError('');
    
        if (!email || !password || !firstName || !lastName || !username) {
            setError("Bitte fülle alle Felder aus.");
            setLoading(false); // Ladezustand zurücksetzen!
            return;
        }
        
    
        try {
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    username
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Registrierung erfolgreich:', data);
                onClose();
            } else {
                setError(data.message || 'Etwas ist schief gelaufen.');
            }
        } catch (error) {
            console.error('Fehler bei der Registrierung:', error);
            setError('Fehler bei der Anfrage.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-buttons">
                    <h2>Registrieren</h2>
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
               <input
                    type="text"
                    placeholder="Vorname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Nachname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input type="text" 
                    placeholder="Benutzername"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {error && <p className="error-message">{error}</p>}
                <button className="btn" onClick={handleRegister} disabled={loading}>
                    {loading ? 'Lädt...' : 'Registrieren'}
                </button>
                <button className="btn" onClick={onSwitchToLogin}>Zurück zum Login</button>
            </div>
        </div>
    );
}

export default RegisterModal;


