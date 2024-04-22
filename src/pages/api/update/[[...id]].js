import { isEmpty } from "lodash";

import { getDB } from "@/serverSide/DB";
import handlers from "@/serverSide/handlers/handlersIndex";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = getDB();

    if (req.query.id?.[0] === undefined) {
      // TODO: update all
      for (const id in data.entries) {
        const entry = data.entries[id];
        if (isEmpty(entry.handlerKeys)) continue;

        for (const handlerKey of entry.handlerKeys) {

        }
      }
    } else {
      // TODO: update that one entry
    }

    //TODO: This should probably return a list of updated entries
    res.status(200).json({ message: 'no idea what I\'m doing' });
  } else {
    res.status(400).json({ message: 'method not supported' });
  }
}
