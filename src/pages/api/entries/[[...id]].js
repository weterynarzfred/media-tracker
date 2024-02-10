import entriesGet from "@/serverSide/entriesGet";
import entriesPost from "@/serverSide/entriesPost";
import entriesPatch from "@/serverSide/entriesPatch";
import entriesDelete from "@/serverSide/entriesDelete";

const METHOD_HANDLERS = {
  GET: entriesGet,
  POST: entriesPost,
  PUT: entriesPost,
  PATCH: entriesPatch,
  DELETE: entriesDelete,
};

export default async function handler(req, res) {
  if (METHOD_HANDLERS[req.method] === undefined) {
    res.status(400).json({ message: 'method not supported' });
    return;
  }

  await METHOD_HANDLERS[req.method](req, res);
};

export const config = { api: { bodyParser: false } };
