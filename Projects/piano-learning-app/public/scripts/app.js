const pdfjsLib = window['pdfjs-dist/build/pdf'];

// Setze den Worker-Pfad
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

document.addEventListener('DOMContentLoaded', async () => {
    const uploadForm = document.getElementById('upload-form');
    const pdfViewer = document.getElementById('pdf-viewer');

    // Funktion: Liste der Dateien abrufen und anzeigen
    async function loadAllPdfs() {
        try {
            const response = await fetch('/list-files');
            if (response.ok) {
                const fileUrls = await response.json();
                pdfViewer.innerHTML = ''; // Vorherigen Inhalt löschen

                // PDFs nacheinander rendern
                for (const fileUrl of fileUrls) {
                    await renderPDF(fileUrl); // Warten, bis die aktuelle PDF gerendert ist
                }
            } else {
                console.error('Fehler beim Abrufen der Dateien:', response.statusText);
            }
        } catch (error) {
            console.error('Fehler beim Laden der Dateien:', error);
        }
    }

    // Event-Listener für das Hochladen
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Verhindert das Neuladen der Seite

            const fileInput = document.getElementById('file-input');
            const file = fileInput.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('file', file);

                try {
                    const response = await fetch('/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        console.log('Datei erfolgreich hochgeladen');
                        await loadAllPdfs(); // Nach dem Hochladen alle PDFs neu laden
                    } else {
                        console.error('Fehler beim Hochladen:', response.statusText);
                    }
                } catch (error) {
                    console.error('Fehler:', error);
                }
            } else {
                console.error('Keine Datei ausgewählt.');
            }
        });
    } else {
        console.error('Formular mit ID "upload-form" nicht gefunden.');
    }

    // Beim Laden der Seite alle PDFs anzeigen
    await loadAllPdfs();
});

// PDF rendern
async function renderPDF(url) {
    const pdfViewer = document.getElementById('pdf-viewer');

    try {
        const pdfDoc = await pdfjsLib.getDocument(url).promise;
        console.log('PDF erfolgreich geladen:', pdfDoc);

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const viewport = page.getViewport({ scale: 1.5 });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await page.render({ canvasContext: context, viewport }).promise;
            pdfViewer.appendChild(canvas);
        }
    } catch (error) {
        console.error('Fehler beim Rendern der PDF:', error);
    }
}
