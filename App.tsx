import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './src/popup';

function MyComponent() {
  return (
    <div>
      <h1>Hello from React!</h1>
      <p>This is a React component in your existing project.</p>
      <Popup />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MyComponent />
  </React.StrictMode>
);