import { handler as nyaaHandler } from "@/serverSide/handlers/nyaa";

const handlers = {
  'nyaa': nyaaHandler,
  'mangadex': () => { },
};

export default handlers;
