import entriesDelete from "@/serverSide/entriesDelete";
import entriesGet from "@/serverSide/entriesGet";
import entriesPost from "@/serverSide/entriesPost";

const METHOD_HANDLERS = {
  GET: entriesGet,
  POST: entriesPost,
  PUT: entriesPost,
  DELETE: entriesDelete,
};

export default async function handler(req, res) {
  if (METHOD_HANDLERS[req.method] === undefined) {
    res.status(400).json({ message: 'method not supported' });
    return;
  }

  METHOD_HANDLERS[req.method](req, res);
};

export const config = { api: { bodyParser: false } };
