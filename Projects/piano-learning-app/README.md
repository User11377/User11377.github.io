# Piano Learning Application

# Server starting
idk man maybe: start the server with npm start
node server.js

## Overview
The Piano Learning Application is designed to help users learn to play the piano by providing an interactive interface that displays sheet music from PDF files. The application utilizes the Audiveris library to process and extract musical information from the selected PDF.

## Features
- Load and display PDF sheet music.
- Interactive piano interface for playing notes.
- Integration with Audiveris for music recognition.
- User-friendly design with responsive layout.

## Project Structure
```
piano-learning-app
├── public
│   ├── index.html          # Main HTML document
│   ├── styles
│   │   └── style.css       # Application styles
│   └── scripts
│       └── app.js          # Main JavaScript file
├── src
│   ├── components
│   │   ├── PDFViewer.js     # Component for displaying PDFs
│   │   └── Piano.js         # Component for piano interface
│   ├── services
│   │   └── audiverisService.js # Service for Audiveris integration
│   └── utils
│       └── fileHandler.js    # Utility functions for file handling
├── assets
│   └── sample.pdf           # Sample PDF for testing
├── package.json             # npm configuration file
├── README.md                # Project documentation
└── .gitignore               # Git ignore file
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/piano-learning-app.git
   ```
2. Navigate to the project directory:
   ```
   cd piano-learning-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Open `public/index.html` in your web browser.
2. Use the interface to select a PDF file containing sheet music.
3. Interact with the piano interface to play notes corresponding to the sheet music.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

