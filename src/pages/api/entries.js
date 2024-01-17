import fs from 'fs';

import { getDB, saveDB } from '../../serverSide/DB';

function str2ab(string) {
  return Buffer.from([...string].map(c => c.charCodeAt()));
}

function parseEntry(entry) {
  if (entry.coverData !== undefined) {
    fs.writeFileSync(
      `./media/${entry.id}.${entry.coverExtension}`,
      str2ab(entry.coverData)
    );
    entry.cover = `${entry.id}.${entry.coverExtension}`;
    delete entry.coverData;
    delete entry.coverExtension;
  }

  return entry;
}

export default async function handler(req, res) {
  const data = getDB();

  if (req.method === 'GET') {
    // TODO: sorting and filtering
    res.status(200).json({ entries: data.entries });
  } else if (req.method === 'POST') {
    const currentId = data.nextId++;
    data.entries[currentId] = parseEntry({
      id: currentId,
      ...req.body.entry,
    });
    await saveDB();
    res.status(201).json({ entry: data.entries[currentId] });
  } else if (req.method === 'PUT') {
    const didExists = data.entries[req.body.entry.id] !== undefined;
    data.entries[req.body.entry.id] = parseEntry(req.body.entry);
    await saveDB();
    res.status(didExists ? 201 : 200).json({ entry: data.entries[req.body.entry.id] });
  } else if (req.method === 'DELETE') {
    if (data.entries[req.body.id] === undefined)
      res.status(404).json({ message: 'entry not found' });
    else {
      if (data.entries[req.body.id].cover !== undefined) {
        fs.unlinkSync(`./media/${data.entries[req.body.id].cover}`);
      }

      delete data.entries[req.body.id];
      await saveDB();
      res.status(200).json({ message: 'entry deleted' });
    }
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
};
