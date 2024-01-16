import { getDB, saveDB } from '../../serverSide/DB';

export default async function handler(req, res) {
  const data = getDB();

  if (req.method === 'GET') {
    // TODO: sorting and filtering
    res.status(200).json({ entries: data.entries });
  }
  else if (req.method === 'POST') {
    const currentId = data.nextId++;
    data.entries[currentId] = {
      id: currentId,
      ...req.body.entry,
    };
    await saveDB();
    res.status(201).json({ entry: data.entries[currentId] });
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
}
