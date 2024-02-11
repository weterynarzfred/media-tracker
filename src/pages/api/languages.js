import { getDB } from "@/serverSide/DB";

export default async function handler(req, res) {
  const data = getDB();

  if (req.method === 'GET') {
    res.status(200).json({ languages: data.languages });
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
}
