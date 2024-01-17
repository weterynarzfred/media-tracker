import fs from 'fs';
import formidable from 'formidable';

import { getDB, saveDB } from '../../serverSide/DB';

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

    // POST
  } else if (req.method === 'POST') {
    try {
      const currentId = data.nextId++;
      const form = formidable({
        uploadDir: './media',
        keepExtensions: true,
        filename: (_originalFilename, extension) => `${currentId}.${extension}`,
        filter: part => part.originalFilename !== '',
      });
      const [fields, files] = await form.parse(req);

      data.entries[currentId] = { id: currentId };
      for (const fieldKey in fields) {
        const value = fields[fieldKey][0];
        data.entries[currentId][fieldKey] = value;
      }

      if (files.cover !== undefined) {
        data.entries[currentId].cover = files.cover[0].newFilename;
      }

      await saveDB();
      res.status(201).json({ entry: data.entries[currentId] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error parsing form data' });
    }

    // PUT
  } else if (req.method === 'PUT') {
    const didExists = data.entries[req.body.entry.id] !== undefined;
    data.entries[req.body.entry.id] = parseEntry(req.body.entry);
    await saveDB();
    res.status(didExists ? 201 : 200).json({ entry: data.entries[req.body.entry.id] });

    // DELETE
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

    // NOY SUPPORTED
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
};

export const config = { api: { bodyParser: false } };
