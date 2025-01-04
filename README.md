# Web Notes Chrome Extension

This skeleton was generated using AI.
A Chrome extension that allows users to save notes and selected text from web pages, with Google authentication and Appwrite backend integration.


## Features

- Save notes with titles and descriptions
- Capture selected text from web pages
- Google authentication integration
- Store notes in Appwrite database
- Tailwind CSS for styling

## Installation

1. Clone the repository:
git clone https://github.com/wherever-note/wherever-notes.git
cd wherever-notes

2. Install dependencies:
npm install

3. Create a .env file with the following variables:
REACT_APP_APPWRITE_ENDPOINT=your_appwrite_endpoint
REACT_APP_APPWRITE_PROJECT_ID=your_project_id
REACT_APP_APPWRITE_DATABASE_ID=your_database_id
REACT_APP_APPWRITE_COLLECTION_ID=your_collection_id

4. Build the extension:
npm run build
npm run build:css


## Development

- Run development server:
bash
npm start

- Watch for CSS changes:
bash
npm run watch:css


## Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `dist` folder from this project

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Appwrite Backend
- Webpack
- Chrome Extension APIs

## Project Structure

- `src/`: Contains the React components and Appwrite SDK integration
- `public/`: Contains the manifest.json and icons
- `dist/`: Contains the build output
- `webpack.config.js`: Webpack configuration
- `package.json`: Project dependencies and scripts



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



