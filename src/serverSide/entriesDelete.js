import fs from 'fs';

import { getDB, saveDB } from "@/serverSide/DB";

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

    let doesTypeStillExist = false;
    for (const id in data.entries) {
      if (parseInt(id) === deletedEntry.id) continue;
      const entry = data.entries[id];
      if (entry.type === deletedEntry.type) {
        doesTypeStillExist = true;
        break;
      }
    }
    if (!doesTypeStillExist)
      data.types.splice(data.types.indexOf(deletedEntry.type), 1);

    delete data.entries[req.query.id];
    await saveDB();
    res.status(200).json({ message: 'entry deleted' });
  }
}
