import './Profile.css';

function Profile() {
  return (
    <div className="profile">
      <h1>Profil</h1>

      {/* Rechter Bereich: Profil bearbeiten */}
      <div className="profile-edit">
        <h2>Profil bearbeiten</h2>
        <form>
          <label>
            <input type="text" placeholder="Dein Benutzername" />
          </label>
          <button type="submit" className="btn save-btn">Speichern</button>
        </form>
      </div>

      {/* Linker Bereich: Noten */}
      <div className="profile-scores">
        <h2>Meine Noten</h2>
        <ul>
          <li>Stück 1: 95%</li>
          <li>Stück 2: 88%</li>
          <li>Stück 3: 76%</li>
          <li>Stück 4: 100%</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;