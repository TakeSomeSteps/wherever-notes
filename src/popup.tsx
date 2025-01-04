import React, { useState, useEffect } from 'react';
import { Client, Account, Databases } from 'appwrite';

console.log("process.env.REACT_APP_APPWRITE_ENDPOINT", process.env.REACT_APP_APPWRITE_ENDPOINT);
console.log("process.env.REACT_APP_APPWRITE_PROJECT_ID", process.env.REACT_APP_APPWRITE_PROJECT_ID);
const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

const Popup = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection) {
        const text = selection.toString().trim(); // Trim whitespace
        setSelectedText(text || ""); // Set null if empty
      }
    };

    // Listen for selection changes on the document
    document.addEventListener('mouseup', handleSelectionChange);
    document.addEventListener('keyup', handleSelectionChange);
    document.addEventListener('selectionchange', handleSelectionChange)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mouseup', handleSelectionChange);
      document.removeEventListener('keyup', handleSelectionChange);
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.error('Not authenticated', error);
    }
  };

  const handleLogin = async () => {
    try {
      await account.createOAuth2Session('google', 'http://localhost:3000/', 'http://localhost:3000/auth/failure', ['profile', 'email']);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleSaveNote = async () => {
    if (!user) {
      alert('Please log in to save notes');
      return;
    }

    try {
      const tab = await new Promise((resolve) => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => resolve(tab));
      });

      const note = {
        userId: user.$id,
        url: tab.url,
        title,
        description,
        selectedText,
        scrollPosition: await new Promise((resolve) => {
          chrome.tabs.sendMessage(tab.id, { action: 'getScrollPosition' }, (response) => resolve(response.scrollPosition));
        }),
      };

      await databases.createDocument(process.env.REACT_APP_APPWRITE_DATABASE_ID, process.env.REACT_APP_APPWRITE_COLLECTION_ID, 'unique()', note);
      alert('Note saved successfully!');
      setTitle('');
      setDescription('');
      setSelectedText('');
    } catch (error) {
      console.error('Failed to save note', error);
      alert('Failed to save note. Please try again.');
    }
  };

  return (
    <div className="p-4 w-80">
      {user ? (
        <>
          <h2 className="text-xl font-bold mb-4">Add Note</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
            rows={3}
          />
          {selectedText && (
            <div className="mb-2">
              <strong>Selected Text:</strong>
              <p className="text-sm">{selectedText}</p>
            </div>
          )}
          <button
            onClick={handleSaveNote}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Note
          </button>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Popup;

