import { JSONFilePreset } from 'lowdb/node';

const db = await JSONFilePreset('db.json', { entries: {}, nextEntryId: 0 });

function getDB() {
  return db.data;
}

async function saveDB() {
  await db.write();
}

export {
  getDB,
  saveDB,
};
