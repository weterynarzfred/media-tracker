import handlers from "@/serverSide/handlers/handlersIndex";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ handlers: Object.keys(handlers) });
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
}
