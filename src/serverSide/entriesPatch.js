import { getDB, saveDB } from "@/serverSide/DB";
import _ from "lodash";
import getRawBody from "raw-body";

export default async function entriesPatch(req, res) {
  const data = getDB();

  const body = JSON.parse((await getRawBody(req)).toString());

  if (req.query.id?.[0] === undefined)
    res.status(400).json({ message: 'method not supported' });
  else if (body.path === undefined)
    res.status(400).json({ message: 'path not defined' });
  else if (body.value === undefined)
    res.status(400).json({ message: 'value not defined' });
  else if (data.entries[req.query.id?.[0]] === undefined)
    res.status(404).json({ message: 'entry not found' });
  else {
    _.set(data.entries[req.query.id[0]], body.path, body.value);

    await saveDB();
    res.status(200).json({ message: 'entry edited' });
  }
}
