import fs from 'fs';
import formidable from 'formidable';

import { getDB, saveDB } from '../../../serverSide/DB';


export default async function handler(req, res) {
  const data = getDB();

  if (req.method === 'GET') {
    // TODO: sorting and filtering
    if (req.query.id?.[0] === undefined)
      res.status(200).json({ entries: data.entries });
    else if (data.entries[req.query.id?.[0]] !== undefined)
      res.status(200).json({ entry: data.entries[req.query.id?.[0]] });
    else
      res.status(404).json({ message: 'entry not found' });

    // POST | PUT
  } else if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const form = formidable({ filter: part => part.originalFilename !== '' });
      const [fields, files] = await form.parse(req);

      const didExist = data.entries[req.query.id?.[0]] !== undefined;
      const currentId = didExist ? req.query.id[0] : data.nextId++;
      data.entries[currentId] = { id: currentId };
      for (const fieldKey in fields) {
        if (fieldKey === 'id') continue;
        if (fieldKey === 'cover' && fields[fieldKey][0] === '') continue;

        data.entries[currentId][fieldKey] = fields[fieldKey][0];
      }

      if (files.cover !== undefined) {
        const extension = files.cover[0].originalFilename.split('.').pop();
        fs.copyFileSync(files.cover[0].filepath, `./media/${currentId}.${extension}`);
        data.entries[currentId].cover = `${currentId}.${extension}`;
      }

      await saveDB();
      res.status(didExist ? 201 : 200).json({
        entry: {
          ...data.entries[currentId],
          cover: data.entries[currentId].cover === undefined ? undefined : data.entries[currentId].cover + `?rand=${Math.random()}`
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error parsing form data' });
    }

    await saveDB();

    // DELETE
  } else if (req.method === 'DELETE') {
    if (req.query.id?.[0] === undefined)
      res.status(400).json({ message: 'method not supported' });
    else if (data.entries[req.query.id?.[0]] === undefined)
      res.status(404).json({ message: 'entry not found' });
    else {
      if (data.entries[req.query.id].cover !== undefined) {
        try {
          fs.unlinkSync(`./media/${data.entries[req.query.id?.[0]].cover}`);
        } catch { }
      }

      delete data.entries[req.query.id];
      await saveDB();
      res.status(200).json({ message: 'entry deleted' });
    }

    // NOY SUPPORTED
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
};

export const config = { api: { bodyParser: false } };
