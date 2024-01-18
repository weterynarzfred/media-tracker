import { getDB } from "@/serverSide/DB";

export default function entriesGet(req, res) {
  const data = getDB();

  // TODO: sorting and filtering
  if (req.query.id?.[0] === undefined)
    res.status(200).json({ entries: data.entries });
  else if (data.entries[req.query.id?.[0]] !== undefined)
    res.status(200).json({ entry: data.entries[req.query.id?.[0]] });
  else
    res.status(404).json({ message: 'entry not found' });
}
