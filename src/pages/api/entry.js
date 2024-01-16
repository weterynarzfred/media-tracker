import { getDB, saveDB } from '../../serverSide/DB';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = getDB();
    res.status(200).json({ entries: data.entries });
  }
  else if (req.method === 'POST') {
    const data = getDB();
    data.entries = req.body.entries;
    await saveDB();
    res.status(200).json({});
  } else {
    res.status(404).json({ message: 'method not supported' });
  }
}
