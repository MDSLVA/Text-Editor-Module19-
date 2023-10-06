

import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Open the database when the module is imported
const dbPromise = initdb();

// Add content to the database
export const putDb = async (content) => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  // Create an object with a timestamp and the provided content
  const newItem = {
    timestamp: Date.now(),
    content: content,
  };
  
  await store.add(newItem);
  await tx.done;
  console.log('Data added to the database');
};

// Retrieve all content from the database
export const getDb = async () => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  // Retrieve all items in the store
  const allItems = await store.getAll();
  await tx.done;
  
  return allItems.map(item => item.content);
};

// Initialize the database when this module is imported
initdb();
