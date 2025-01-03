import { Client, Account, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'login') {
    account.createOAuth2Session('google')
      .then(() => sendResponse({ success: true }))
      .catch((error) => sendResponse({ success: false, error }));
    return true;
  }

  if (request.action === 'saveNote') {
    databases.createDocument(process.env.REACT_APP_APPWRITE_DATABASE_ID, process.env.REACT_APP_APPWRITE_COLLECTION_ID, 'unique()', request.note)
      .then(() => sendResponse({ success: true }))
      .catch((error) => sendResponse({ success: false, error }));
    return true;
  }
});

