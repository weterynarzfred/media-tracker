import formidable from 'formidable';

import { getDB, saveDB } from "@/serverSide/DB";
import resizeImage from "@/serverSide/resizeImage";

export default async function entriesPost(req, res) {
  const data = getDB();

  try {
    const form = formidable({ filter: part => part.originalFilename !== '' });
    const [fields, files] = await form.parse(req);

    const didExist = data.entries[req.query.id?.[0]] !== undefined;
    const currentId = didExist ? req.query.id[0] : data.nextEntryId++;
    data.entries[currentId] = { id: currentId };
    for (const fieldKey in fields) {
      if (fieldKey === 'id') continue;
      if (fieldKey === 'cover' && fields.cover[0] === '') continue;

      data.entries[currentId][fieldKey] = fields[fieldKey][0];

      if (fieldKey === 'type' && !data.types.includes(fields[fieldKey][0]))
        data.types.push(fields[fieldKey][0]);
    }

    if (files.cover !== undefined) {
      await resizeImage(files.cover[0].filepath, `./media/${currentId}.jpg`);
      data.entries[currentId].cover = `${currentId}.jpg`;
    }

    await saveDB();
    res.status(didExist ? 200 : 201).json({
      entry: {
        ...data.entries[currentId],
        cover: data.entries[currentId].cover === undefined ? undefined : data.entries[currentId].cover + `?rand=${Math.random()}`
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error parsing form data' });
  }
}
