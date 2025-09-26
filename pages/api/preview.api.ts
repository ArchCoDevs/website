import type { NextApiRequest, NextApiResponse } from 'next';

export default function preview(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  res.setPreviewData({});
  res.redirect('/');
}
