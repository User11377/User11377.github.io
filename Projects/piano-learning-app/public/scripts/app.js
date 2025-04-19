const pdfjsLib = window['pdfjs-dist/build/pdf'];

// Setze den Worker-Pfad
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

document.getElementById('upload-form').addEventListener('submit', async function (event) {
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
                const result = await response.json();
                const filePath = result.filePath;

                console.log('Hochgeladene Datei:', filePath);

                // PDF anzeigen
                renderPDF(filePath);
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

// PDF rendern
async function renderPDF(url) {
    const pdfViewer = document.getElementById('pdf-viewer');
    pdfViewer.innerHTML = ''; // Vorherigen Inhalt löschen

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