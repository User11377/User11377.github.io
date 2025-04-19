const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Multer-Konfiguration: Dateien im Ordner "uploads" speichern
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpunkt zum Hochladen der Datei
app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path;

    // Pfad anpassen, um Forward Slashes zu verwenden
    const publicPath = `/uploads/${path.basename(filePath)}`;

    console.log('Datei hochgeladen:', filePath);
    res.json({ message: 'Datei erfolgreich hochgeladen!', filePath: publicPath });
});

// Endpunkt zum Abrufen aller Dateien im Ordner "uploads"
app.get('/list-files', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error('Fehler beim Lesen des Ordners:', err);
            return res.status(500).json({ error: 'Fehler beim Abrufen der Dateien' });
        }

        // Erstelle eine Liste der URLs zu den Dateien
        const fileUrls = files.map(file => `/uploads/${file}`);
        res.json(fileUrls);
    });
});

app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});

