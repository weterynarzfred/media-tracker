import fs from 'fs';

import { getDB, saveDB } from "@/serverSide/DB";

function cleanMetaIndex(key, keyPlural, deletedEntry, data) {
  let doesStillExist = false;
  for (const id in data.entries) {
    const entry = data.entries[id];
    if (entry.id === deletedEntry.id) continue;

    if (entry[key] === deletedEntry[key]) {
      doesStillExist = true;
      break;
    }
  }

  if (!doesStillExist)
    data[keyPlural].splice(data[keyPlural].indexOf(deletedEntry[key]), 1);
}

export default async function entriesDelete(req, res) {
  const data = getDB();

  if (req.query.id?.[0] === undefined)
    res.status(400).json({ message: 'method not supported' });
  else if (data.entries[req.query.id?.[0]] === undefined)
    res.status(404).json({ message: 'entry not found' });
  else {
    const deletedEntry = data.entries[req.query.id[0]];
    if (deletedEntry.cover !== undefined) {
      try {
        fs.unlinkSync(`./media/${deletedEntry.cover}`);
      } catch { }
    }

    cleanMetaIndex('type', 'types', deletedEntry, data);
    cleanMetaIndex('language', 'languages', deletedEntry, data);
    cleanMetaIndex('status', 'statuses', deletedEntry, data);


    delete data.entries[req.query.id];
    await saveDB();
    res.status(200).json({ message: 'entry deleted' });
  }
}
