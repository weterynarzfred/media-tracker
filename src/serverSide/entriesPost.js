import formidable from 'formidable';

import { getDB, saveDB } from "@/serverSide/DB";
import resizeImage from "@/serverSide/resizeImage";
import handlers from "@/serverSide/handlers/handlersIndex";

function isEmpty(e) {
  return [undefined, null, ''].includes(e);
}

export default async function entriesPost(req, res) {
  const data = getDB();

  try {
    const form = formidable({ filter: part => part.originalFilename !== '' });
    const [fields, files] = await form.parse(req);

    const didExist = data.entries[req.query.id?.[0]] !== undefined;

    const entry = {
      id: didExist ? parseInt(req.query.id?.[0]) : data.nextEntryId++,
      cover: isEmpty(fields.cover?.[0]) ? null : fields.cover[0],
      type: isEmpty(fields.type?.[0]) ? null : fields.type[0],
      handlerKeys: isEmpty(handlers[fields.handlerKeys?.[0]]) ? null : fields.handlerKeys,
      name: isEmpty(fields.name?.[0]) ? null : fields.name[0],
      creator: isEmpty(fields.creator?.[0]) ? null : fields.creator[0],
      language: isEmpty(fields.language?.[0]) ? null : fields.language[0],
      status: isEmpty(fields.status?.[0]) ? null : fields.status[0],
      score: isEmpty(fields.score?.[0]) ? null : parseFloat(fields.score[0]),
      counts: {
        seen: isEmpty(fields.countSeen?.[0]) ? null : fields.countSeen[0],
        out: isEmpty(fields.countOut?.[0]) ? null : fields.countOut[0],
      },
    };

    // add autocomplete data if it didn't exist before
    if (entry.type !== null && !data.types.includes(entry.type))
      data.types.push(entry.type);
    if (entry.language !== null && !data.languages.includes(entry.language))
      data.languages.push(entry.language);
    if (entry.status !== null && !data.statuses.includes(entry.status))
      data.statuses.push(entry.status);

    // replace or add cover if new file was sent
    if (!isEmpty(files.cover?.[0])) {
      await resizeImage(files.cover[0].filepath, `./media/${entry.id}.jpg`);
      entry.cover = `${entry.id}.jpg`;
    }

    data.entries[entry.id] = entry;

    await saveDB();
    res.status(didExist ? 200 : 201).json({
      entry: {
        ...entry,
        cover: entry.cover === null ? null : entry.cover + `?rand=${Math.random()}`
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error parsing form data' });
  }
}
