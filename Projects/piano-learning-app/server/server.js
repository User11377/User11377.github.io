const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
    const filePath = req.file.path;

    // Pfad anpassen, um Forward Slashes zu verwenden
    const publicPath = `/uploads/${path.basename(filePath)}`;

    console.log('Datei hochgeladen:', filePath);
    res.json({ message: 'Datei erfolgreich hochgeladen!', filePath: publicPath });
});

// Endpunkt zum Anzeigen der PDF
app.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);

    // Überprüfen, ob die Datei existiert
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'application/pdf');
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.status(404).send('Datei nicht gefunden');
    }
});

app.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});

