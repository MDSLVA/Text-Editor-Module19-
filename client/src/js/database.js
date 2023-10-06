import { openDB } from 'idb';

let db; // Declare a variable to hold the database instance

const initdb = async () => {
  if (db) {
    return db; // If the database is already initialized, return it
  }

  db = await openDB('jate', 1, {
    upgrade(database) {
      if (!database.objectStoreNames.contains('jate')) {
        const store = database.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        console.log('jate object store created');
      }
    },
  });

  console.log('jate database opened');
  return db;
};




export const putDb = async (content) => {
  try {
    const database = await initdb();
    const tx = database.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    await store.add(content);
    console.log('Content added to the database:', content);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};


export const getDb = async () => {
  try {
    const database = await initdb();
    const tx = database.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const content = await store.getAll();
    console.log('All content from the database:', content);
    return content;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return [];
  }
};


initdb();