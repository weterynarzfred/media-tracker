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
  }
  else if (req.method === 'DELETE') {
    if (data.entries[req.body.id] === undefined)
      res.status(404).json({ message: 'entry not found' });
    else {
      delete data.entries[req.body.id];
      await saveDB();
      res.status(200).json({ message: 'entry deleted' });
    }
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
}
