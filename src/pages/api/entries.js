import fs from 'fs';
import formidable from 'formidable';
import getRawBody from 'raw-body';

import { getDB, saveDB } from '../../serverSide/DB';

export default async function handler(req, res) {
  const data = getDB();

  if (req.method === 'GET') {
    // TODO: sorting and filtering
    res.status(200).json({ entries: data.entries });

    // POST | PUT
  } else if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const form = formidable({
        filter: part => part.originalFilename !== '',
      });
      const [fields, files] = await form.parse(req);

      console.log(fields.id[0]);
      const didExist = parseInt(fields.id[0]) !== -1;
      const currentId = didExist ? fields.id[0] : data.nextId++;
      data.entries[currentId] = { id: currentId };
      for (const fieldKey in fields) {
        if (fieldKey === 'id') continue;
        const value = fields[fieldKey][0];
        data.entries[currentId][fieldKey] = value;
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
          cover: data.entries[currentId].cover === undefined ? undefined : data.entries[currentId].cover + `?v=${Math.random()}`
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error parsing form data' });
    }

    await saveDB();

    // DELETE
  } else if (req.method === 'DELETE') {
    const body = JSON.parse((await getRawBody(req)).toString());
    if (data.entries[body.id] === undefined)
      res.status(404).json({ message: 'entry not found' });
    else {
      if (data.entries[body.id].cover !== undefined) {
        fs.unlinkSync(`./media/${data.entries[body.id].cover}`);
      }

      delete data.entries[body.id];
      await saveDB();
      res.status(200).json({ message: 'entry deleted' });
    }

    // NOY SUPPORTED
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
};

export const config = { api: { bodyParser: false } };
