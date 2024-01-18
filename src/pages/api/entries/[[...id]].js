import fs from 'fs';
import formidable from 'formidable';

import { getDB, saveDB } from '../../../serverSide/DB';
import resizeImage from '../../../serverSide/resizeImage';


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
      const currentId = didExist ? req.query.id[0] : data.nextEntryId++;
      data.entries[currentId] = { id: currentId };
      for (const fieldKey in fields) {
        if (fieldKey === 'id') continue;
        if (fieldKey === 'cover' && fields[fieldKey][0] === '') continue;

        data.entries[currentId][fieldKey] = fields[fieldKey][0];

        if (fieldKey === 'type' && !data.types.includes(fields[fieldKey][0]))
          data.types.push(fields[fieldKey][0]);
      }

      if (files.cover !== undefined) {
        await resizeImage(files.cover[0].filepath, `./media/${currentId}.jpg`);
        data.entries[currentId].cover = `${currentId}.jpg`;
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

    // NOY SUPPORTED
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
};

export const config = { api: { bodyParser: false } };
