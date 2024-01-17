import express from 'express';

const handler = express();

const serveFiles = express.static('./media');
handler.use(['/api/media', '/media'], serveFiles);

export default handler;

export const config = {
  api: { externalResolver: true }
};
