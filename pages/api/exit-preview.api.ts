import type { NextApiRequest, NextApiResponse } from 'next';

export default function exit(req: NextApiRequest, res: NextApiResponse) {
  res.clearPreviewData();
  res.redirect('/');
}
