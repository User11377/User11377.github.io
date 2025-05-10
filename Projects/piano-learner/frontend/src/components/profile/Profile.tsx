import './Profile.css';
import { useState } from 'react';

function Profile() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      console.log("PDF ausgewählt:", file.name);
    } else {
      alert("Bitte eine gültige PDF-Datei auswählen.");
    }
  };

  const handleUploadClicked = () => {
    document.getElementById('pdfInput')?.click();
  };

  return (
    <div className="profile">
      <h1>Profil</h1>

      {/* Bereich: Profil bearbeiten */}
      <div className="profile-edit">
        <h2>Profil bearbeiten</h2>
        <form>
          <label>
            Benutzername
            <input type="text" placeholder="Dein Benutzername" />
          </label>
          <button type="submit" className="btn save-btn">Speichern</button>
        </form>
      </div>

      {/* Bereich: Noten hochladen */}
      <div className="profile-upload">
        <h2>Noten hochladen</h2>
        <p className="upload-description">
          Lade hier deine Noten als PDF hoch, um sie zu speichern und zu verwalten.
        </p>
        <input
          id="pdfInput"
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button className="btn upload-btn" onClick={handleUploadClicked}>
          PDF Datei auswählen
        </button>

        {/* Nur anzeigen, wenn eine Datei ausgewählt wurde */}
        {pdfFile && <p className="file-info">Ausgewählte Datei: {pdfFile.name}</p>}

        <button className="btn upload-confirm-btn">Hochladen</button>
      </div>

      {/* Bereich: Meine Noten */}
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
